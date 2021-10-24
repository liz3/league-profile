
export const mapMatchData = (data, summonerId) => {
    let wantedUser = null;
    const playersMapped = data.info.participants.map(entry => {
        const focused = entry.summonerId === summonerId;

        const dataFull = {teamId: entry.teamId, player: {
            summonerId: entry.summonerId,
            summonerName: entry.summonerName,
            icon: entry.profileIcon,
            puuid: entry.puuid,
        }, playerData: entry, focused}
        if(focused) wantedUser = dataFull;
        return dataFull;
    });
    if(!wantedUser) return null
    const teams = [];
    playersMapped.forEach(p => {
        const t = teams.find(e => e.id === p.teamId)
        if(t) {
            t.players.push(p)
        } else {
            teams.push({id: p.teamId, players: [p], teamData: data.info.teams.find(t => t.teamId === p.teamId)})
        }
    });
    teams.forEach(team => {
        team.players.sort((a, b) => {
            if(a.focused) return -1;
            if(b.focused) return 1;
            return 0
        })
    })
    teams.sort((a,b) => {
        if(a.players[0].focused) return -1;
        if(b.players[0].focused) return 1;
        return 0;
    })
    return {...data, teams, win: data.info.teams.find(t => t.teamId === wantedUser.teamId).win}
}