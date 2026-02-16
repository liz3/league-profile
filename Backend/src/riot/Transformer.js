import { getTitle } from "./utils.js"

export const transformUser = data => {
    console.log(data)
    if(Array.isArray(data)) {
        return data.map( entry => transformUser(entry))
    }
   return {summonerLevel: data.summonerLevel, profileIconId: data.profileIconId, id: data.puuid, accountId: data.puuid, name: data.gameName, tag: data.tagLine}
}
export const transformChampion = data => {
    if(Array.isArray(data)) {
        return data.map( entry => transformChampion(entry))
    }
    return {championId: data.championId, championLevel: data.championLevel, championPoints: data.championPoints,}
}
export const transformChallenges = async (data, api) => {
    if(data.preferences && data.preferences.title) {
        data.preferences.title_name = getTitle(data.preferences.title);
    }
    data.challenges = data.challenges.filter(challenge => {
        return data.preferences.challengeIds.includes(challenge.challengeId);
    });
    for(const ch of data.challenges){
        ch.meta = await api.getChallengeDescription(ch.challengeId);
    }
    return data;
}
export const transformRanked = data => {
    if(Array.isArray(data)) {
        return data.map( entry => transformRanked(entry))
    }
    return {queueType: data.queueType, tier: data.tier, rank: data.rank, leaguePoints: data.leaguePoints, wins: data.wins, losses: data.losses}
}
