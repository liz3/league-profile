export const transformUser = data => {
    if(Array.isArray(data)) {
        return data.map( entry => transformUser(entry))
    }
   return {summonerLevel: data.summonerLevel, profileIconId: data.profileIconId, id: data.id, accountId: data.accountId, name: data.name}
}
export const transformChampion = data => {
    if(Array.isArray(data)) {
        return data.map( entry => transformChampion(entry))
    }
    return {championId: data.championId, championLevel: data.championLevel, championPoints: data.championPoints,}
}

export const transformRanked = data => {
    if(Array.isArray(data)) {
        return data.map( entry => transformRanked(entry))
    }
    return {queueType: data.queueType, tier: data.tier, rank: data.rank, leaguePoints: data.leaguePoints, wins: data.wins, losses: data.losses}
}
