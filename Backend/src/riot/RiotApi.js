import { getHostFromKey, getMatchRouting } from "./utils.js";
import {
  transformRanked,
  transformChampion,
  transformUser,
  transformChallenges
} from "./Transformer.js";

class RiotApi {
  constructor(token, tftToken, databaseApi) {
    this.token = token;
    this.tftToken = tftToken;
    this.databaseApi = databaseApi;
    this.challengeDescriptions = null;
  }
  async _request(region, path, domain = "lol") {
    const host = getHostFromKey(region);

    if (!host) throw new Error("Unknown region: " + region);
    const url = `https://${host}/${domain}${path}`;
    console.log("GET", url);
    const opts = {
      headers: {
        "X-Riot-Token": domain === "tft" ? this.tftToken : this.token,
      },
    };
    const result = await fetch(url, opts);
    if (result.status !== 200) throw new Error("Non 200 code " + result.status);
    const content = await result.json();
    return content;
  }
  async getChallengeDescription(id) {
    if(!this.challengeDescriptions ||Date.now() - this.challengeDescriptions.fetched > 1000 * 60 * 60 * 5) {
      const result = await this._request("euw1", "/challenges/v1/challenges/config");
      this.challengeDescriptions = {data: result, fetched: Date.now()}
    }
    const entry = this.challengeDescriptions.data.find(e => e.id === id);
    if(entry) {
      return {description: entry.localizedNames.en_GB, threshold: entry.thresholds};
    }
    return null;
  }
  async _getSummerData(region, summonerId) {
        const collection = this.databaseApi.coll("sum-data");
    const dbResult = await collection.findOne({
      region,
      "data.puuid": summonerId,
    });
        if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `/summoner/v4/summoners/by-puuid/${summonerId}`,
    );
    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } },
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
  async _getUserByName(region, userName, tag) {
    const collection = this.databaseApi.coll("users");
    const dbResult = await collection.findOne({
      region,
      "data.gameName": userName,
      "data.tagLine": tag,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(
      region,
      `riot/account/v1/accounts/by-riot-id/${encodeURIComponent(userName)}/${encodeURIComponent(tag)}`,
      "",
    );
    const { region: lolRegion } = await this._request(
      region,
      `riot/account/v1/region/by-game/lol/by-puuid/${result.puuid}`,
      "",
    );

    const { region: tftRegion } = await this._request(
      region,
      `riot/account/v1/region/by-game/tft/by-puuid/${result.puuid}`,
      "",
    );

    const resultData = { ...result, regions: {tftRegion, lolRegion} };

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: resultData, updated: Date.now() } },
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
      "data.puuid": id,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 30 > Date.now()) {
        return dbResult.data;
      }
    }
    const result = await this._request(region, `riot/account/v1/accounts/by-puuid/${id}`, "");

    const { region: lolRegion } = await this._request(
      region,
      `riot/account/v1/region/by-game/lol/by-puuid/${result.puuid}`,
      "",
    );

    const { region: tftRegion } = await this._request(
      region,
      `riot/account/v1/region/by-game/tft/by-puuid/${result.puuid}`,
      "",
    );

    const resultData = { ...result, regions: {tftRegion, lolRegion} };

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: resultData, updated: Date.now() } },
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
      `/champion-mastery/v4/champion-masteries/by-puuid/${summonerId}`,
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } },
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
    const resultLeague = await this._request(
      region,
      `/league/v4/entries/by-puuid/${summonerId}`,
    );
    const resultTft = await this._request(
      region,
      `/league/v1/by-puuid/${summonerId} `,
      "tft",
    );
    const result = [...resultLeague, ...resultTft];

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } },
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
  async _getChallenges(region, summonerId) {
    const collection = this.databaseApi.coll("challenges");
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
      `/challenges/v1/player-data/${summonerId}`,
    );

    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } },
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
      puuid,
    });
    if (dbResult) {
      if (dbResult.updated + 1000 * 60 * 15 > Date.now()) {
        return dbResult.data;
      }
    }
    const resultRaw = await this._request(
      region,
      `/match/v5/matches/by-puuid/${puuid}/ids?count=20`,
      "lol",
    );
    const result = resultRaw;
    if (dbResult) {
      await collection.updateOne(
        { _id: dbResult._id },
        { $set: { data: result, updated: Date.now() } },
      );
    } else {
      await collection.insertOne({
        data: result,
        region,
        puuid,
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
    const result = await this._request(
      region,
      `/match/v5/matches/${matchId}`,
      
    );
    await collection.insertOne({
      data: result,
      region,
      matchId,
      updated: Date.now(),
    });

    return result;
  }
  async getMatchHistory(region, accountId, reg) {
    const userData = await this._getUserById(reg, accountId);
    const matchList = await this._getMatchlist(
      reg,
      accountId,
      userData.puuid,
    );
    const matches = await Promise.all(
      matchList.map((elem) => this._getMatch(reg, elem)),
    );
    console.log(matches)

    return matches
      .map((game) => {
       
        const playerData = game.info.participants.find(
          (e) => e.puuid === userData.puuid,
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
  async getUserByName(reg, userName, tag) {
    const userData = await this._getUserByName(reg, userName, tag);
    const region = userData.regions.lolRegion;
    const userChamps = await this._getChampionMastery(region, userData.puuid);
    const ranked = await this._getLeagues(region, userData.puuid);
    const matches = await this.getMatchHistory(region, userData.puuid, reg);
    const leagues = await this._getChallenges(region, userData.puuid);
    const champs = [];
        const summonerData = await this._getSummerData(region, userData.puuid)
    matches.forEach((element) => {
      if (!champs.find((e) => e.champId === element.champion)) {
        champs.push({ champId: element.champion, count: 1 });
      } else {
        champs.find((e) => e.champId === element.champion).count += 1;
      }
    });
    const masteryAmount = userChamps.reduce(
      (acc, val) => acc + val.championLevel,
      0,
    );
    return {
      user: transformUser({...userData, ...summonerData}),
      champs: transformChampion(
        userChamps
          .sort((a, b) => b.championPoints - a.championPoints)
          .sort((a, b) => b.championLevel - a.championLevel),
      ),
      ranked: transformRanked(ranked),
      masteryAmount,
      challenges: await transformChallenges(leagues, this),
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
