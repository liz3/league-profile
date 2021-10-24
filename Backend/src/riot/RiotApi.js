import axios from "axios";
import { getHostFromKey, getMatchRouting } from "./utils";
import {
  transformRanked,
  transformChampion,
  transformUser,
} from "./Transformer";

class RiotApi {
  constructor(token, tftToken, databaseApi) {
    this.token = token;
    this.tftToken = tftToken;
    this.databaseApi = databaseApi;
    this.client = axios.create();
  }
  async _request(region, path, domain = "lol") {
    const host = getHostFromKey(region);

    if (!host) throw new Error("Unknown region");
    const url =
      domain === "match"
        ? `https://${getMatchRouting(region)}.api.riotgames.com/lol${path}`
        : `https://${host}/${domain}${path}`;
    console.log("GET", url);
    const opts = {
      headers: {
        "X-Riot-Token": domain === "tft" ? this.tftToken : this.token,
      },
    };
    const result = await this.client.get(url, opts);
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

    const tftResult = await this._request(
      region,
      `/summoner/v1/summoners/by-name/${encodeURIComponent(userName)}`,
      "tft"
    );

    const resultData = { ...result, tftId: tftResult.id };

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: resultData, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: resultData,
        region,
        updated: Date.now(),
      });
    }
    return resultData;
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
    const result = await this._request(region, `/summoner/v4/summoners/${id}`);

    const tftResult = await this._request(
      region,
      `/summoner/v1/summoners/by-name/${encodeURIComponent(result.name)}`,
      "tft"
    );

    const resultData = { ...result, tftId: tftResult.id };

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: resultData, updated: Date.now() } }
      );
    } else {
      await collection.insertOne({
        data: resultData,
        region,
        updated: Date.now(),
      });
    }
    return resultData;
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
  async _getLeagues(region, summonerId, tftId) {
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
    const resultLeague = await this._request(
      region,
      `/league/v4/entries/by-summoner/${summonerId}`
    );
    const resultTft = await this._request(
      region,
      `/league/v1/entries/by-summoner/${tftId}`,
      "tft"
    );
    const result = [...resultLeague, ...resultTft];

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
  async _getMatchlist(region, accountId, puuid) {
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
      `/match/v5/matches/by-puuid/${puuid}/ids?count=20`,
      "match"
    );
    const result = resultRaw;
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
    const result = await this._request(region, `/match/v5/matches/${matchId}`, "match");
    await collection.insertOne({
      data: result,
      region,
      matchId,
      updated: Date.now(),
    });

    return result;
  }
  async getMatchHistory(region, accountId) {
    const userData = await this._getUserById(region, accountId);
    const matchList = await this._getMatchlist(region, accountId, userData.puuid);
    const matches = await Promise.all(
      matchList.map((elem) => this._getMatch(region, elem))
    );

    return matches
      .map((game) => {
        const playerData = game.info.participants.find(
          (e) => e.summonerId === userData.id
        );
        const teamId = playerData.teamId;
        const team = game.info.teams.find((t) => t.teamId === teamId);
        const win = playerData.win;

        return {
          matchIdNew: game.metadata.matchId,
          win,
          team,
          playerData,
          champion: playerData.championId,
   //       platformId: game.platformId,
          gameCreation: game.info.gameCreation,
          gameDuration: game.info.gameDuration,
          queueId: game.info.queueId,
          mapId: game.info.mapId,
       //   seasonId: game.seasonId,
          gameVersion: game.info.gameVersion,
          gameMode: game.info.gameMode,
     //     gameType: game.gameType,
          gameId: game.info.gameId,
        };
      })
      .filter((e) => e !== null);
  }
  async getMatch(region, gameId) {
    const matchData = await this._getMatch(region, gameId);
    return matchData;
  }
  async getUserByName(region, userName) {
    const userData = await this._getUserByName(region, userName);
    const userChamps = await this._getChampionMastery(region, userData.id);
    const ranked = await this._getLeagues(region, userData.id, userData.tftId);
    const matches = await this.getMatchHistory(region, userData.id);
    const champs = [];
    matches.forEach((element) => {
      if (!champs.find((e) => e.champId === element.champion)) {
        champs.push({ champId: element.champion, count: 1 });
      } else {
        champs.find((e) => e.champId === element.champion).count += 1;
      }
    });
    const masteryAmount = userChamps.reduce(
      (acc, val) => acc + val.championLevel,
      0
    );
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
    const userData = await this._getUserById(region, summonerId);
    return {
      user: transformUser(userData),
    };
  }
}
export default RiotApi;
