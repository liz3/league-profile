
export const mapMatchData = (data, summonerId) => {
    let wantedUser = null;
    const playersMapped = data.participantIdentities.map(entry => {
        const {participantId, player} = entry;
        const playerData = data.participants.find(e => e.participantId === participantId);
        const focused = player.summonerId === summonerId;

        const dataFull = {teamId: playerData.teamId, player, playerData, focused}
        if(focused) wantedUser = dataFull;
        return dataFull;
    });
    const teams = [];
    playersMapped.forEach(p => {
        const t = teams.find(e => e.id === p.teamId)
        if(t) {
            t.players.push(p)
        } else {
            teams.push({id: p.teamId, players: [p], teamData: data.teams.find(t => t.teamId === p.teamId)})
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
    return {...data, teams, win: data.teams.find(t => t.teamId === wantedUser.teamId).win === "Win"}
}