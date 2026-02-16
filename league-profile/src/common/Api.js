import axios from 'axios'
class Api {
    constructor() {
        this.instance = axios.create({baseURL: window.location.hostname.includes("localhost") ? "http://localhost:3005" : "https://api.lol-profile.com"})
    }

    getProfile(region, name, tag) {
        return this.instance.get(`/user/by-name/${region}/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`) 
    }
    getProfileBySummonerId(region, id) {
        return this.instance.get(`/user/by-id/${region}/${id}`)
    }
    getLeagueVersions() {
        return axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
    }
    getMatchlist(region, accountId) {
        return this.instance.get(`/matches/matchlist/${region}/${accountId}`)
    }
    getMatch(region, matchId) {
        return this.instance.get(`/matches/match/${region}/${matchId}`)
    }
    getChampions(patch) {
        return axios.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`)
    } 
    getItems(patch) {
        return axios.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/item.json`)
    } 
    getSummoner(patch) {
        return axios.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/summoner.json`)
    } 
    getRunes(patch){
        return axios.get(`https://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/runesReforged.json`)
    }
}

export default new Api();