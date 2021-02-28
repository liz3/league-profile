import axios from "axios";
import { getHostFromKey } from "./utils";
import {
  transformRanked,
  transformChampion,
  transformUser,
} from "./Transformer";

class RiotApi {
  constructor(token, databaseApi) {
    this.token = token;
    this.databaseApi = databaseApi;
    this.client = axios.create();
    this.client.defaults.headers.common["X-Riot-Token"] = token;
  }
  async _request(region, path) {
    const host = getHostFromKey(region);
    if (!host) throw new Error("Unknown region");
    const url = `https://${host}/lol${path}`;
    console.log("GET", url);
    const result = await this.client.get(url);
    if (result.status !== 200) throw new Error("Non 200 code " + result.status);
    return result.data;
  }
  async _getUserByName(region, userName) {
    const collection = this.databaseApi.coll("users");
    const dbResult = await collection.findOne({
      region,
      "data.name": userName,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `/summoner/v4/summoners/by-name/${encodeURIComponent(userName)}`
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        updated: Date.now(),
      });
    }
    return result;
  }
  async _getUserById(region, id) {
    const collection = this.databaseApi.coll("users");
    const dbResult = await collection.findOne({
      region,
      "data.id": id,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `/summoner/v4/summoners/${id}`
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        updated: Date.now(),
      });
    }
    return result;
  }
  async _getChampionMastery(region, summonerId) {
    const collection = this.databaseApi.coll("champion-mastery");
    const dbResult = await collection.findOne({
      region,
      summonerId,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        summonerId,
        updated: Date.now(),
      });
    }
    return result;
  }
  async _getLeagues(region, summonerId) {
    const collection = this.databaseApi.coll("leagues");
    const dbResult = await collection.findOne({
      region,
      summonerId,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 15 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `/league/v4/entries/by-summoner/${summonerId}`
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        summonerId,
        updated: Date.now(),
      });
    }
    return result;
  }
  async _getMatchlist(region, accountId) {
    const collection = this.databaseApi.coll("matchlist");
    const dbResult = await collection.findOne({
      region,
      accountId,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 15 > Date.now()) {
        return dbResult.data;
      }
    }
    const resultRaw = await this._request(
      region,
      `/match/v4/matchlists/by-account/${accountId}?endIndex=20`
    );
    const result = resultRaw.matches;
    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        accountId,
        updated: Date.now(),
      });
    }
    return result;
  }
  async _getMatch(region, matchId) {
    const collection = this.databaseApi.coll("matches");
    const dbResult = await collection.findOne({
      region,
      matchId,
    });
    if (dbResult) {
      return dbResult.data;
    }
    const result = await this._request(region, `/match/v4/matches/${matchId}`);
    await collection.insertOne({
      data: result,
      region,
      matchId,
      updated: Date.now(),
    });

    return result;
  }
  async getMatchHistory(region, accountId) {
    const matchList = await this._getMatchlist(region, accountId);
    const matches = await Promise.all(
      matchList.map((elem) => this._getMatch(region, elem.gameId))
    );

    return matches.map((game) => {
      const accountIdentity = game.participantIdentities.find(
        (entry) => entry.player.accountId === accountId
      );
      const id = accountIdentity.participantId;
      const playerData = game.participants.find((e) => e.participantId === id);
      const teamId = playerData.teamId;
      const team = game.teams.find((t) => t.teamId === teamId);
      const win = team.win === "Win";

      return {
        win,
        team,
        playerData,
        platformId: game.platformId,
        gameCreation: game.gameCreation,
        gameDuration: game.gameDuration,
        queueId: game.queueId,
        mapId: game.mapId,
        seasonId: game.seasonId,
        gameVersion: game.gameVersion,
        gameMode: game.gameMode,
        gameType: game.gameType,
        gameId: game.gameId
      };
    });
  }
  async getMatch(region, gameId) {
    const matchData = await this._getMatch(region, gameId)
    return matchData;
  }
  async getUserByName(region, userName) {
    const userData = await this._getUserByName(region, userName);
    const userChamps = await this._getChampionMastery(region, userData.id);
    const ranked = await this._getLeagues(region, userData.id);
    const matchList = await this._getMatchlist(region, userData.accountId);
    const champs = [];
    matchList.forEach((element) => {
      if (!champs.find((e) => e.champId === element.champion)) {
        champs.push({ champId: element.champion, count: 1 });
      } else {
        champs.find((e) => e.champId === element.champion).count += 1;
      }
    });
    const masteryAmount = userChamps.reduce((acc, val) => acc + val.championLevel, 0)
    return {
      user: transformUser(userData),
      champs: transformChampion(
        userChamps
        .sort((a, b) => b.championPoints - a.championPoints)
        .sort((a, b) => b.championLevel - a.championLevel)
         
      ),
      ranked: transformRanked(ranked),
      masteryAmount,
      mostPlayed: champs.sort((a, b) => b.count - a.count)[0],
    };
  }
  async getUserBySummonerId(region, summonerId) {
    const userData = await this._getUserById(region, summonerId)
    return {
      user: transformUser(userData),
    };
  }
}
export default RiotApi;
