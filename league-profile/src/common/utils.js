
export const getChampionSplash = key => `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${key}_0.jpg`
export const getChampionAvatar = (patch, key) => `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${key}.png`
export const getItemImage = (patch, id) => `https://ddragon.leagueoflegends.com/cdn/${patch}/img/item/${id}.png`
export const getSummonerImage = (patch, key) => `https://ddragon.leagueoflegends.com/cdn/${patch}/img/spell/${key}.png`
export const getRuneImg = path => `http://ddragon.leagueoflegends.com/cdn/img/${path}`
export const getEntryFromId = (data, idRaw) => {
    const id = typeof idRaw === 'number' ? `${idRaw}` : idRaw;
    return Object.values(data).find(entry => entry.key === id)
}
export const getProfilePictureUrl = (patch, id) => `https://ddragon.leagueoflegends.com/cdn/${patch}/img/profileicon/${id}.png`;

export const toNormalString = string => `${string[0].toUpperCase()}${string.substr(1).toLowerCase()}`

export const formatTime = (str) => {
    var sec_num = parseInt(str, 10);
    var minutes = Math.floor(sec_num / 60);
    var seconds = sec_num - minutes * 60;
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  export const getRune = (runes, id)=>  {
    for(const entry of runes) {
        for(const keyStone of entry.slots[0].runes) {
            if(keyStone.id === id) {
                return {treeName: entry.name, treeIcon: entry.icon, rune: keyStone}
            }
        }
    }
    return null;
  }
  
  export const QueueNames = {
    440: "Ranked Flex",
    420: "Ranked Solo/Duo",
    0: "Custom",
    830: "Co-op vs. AI",
    840: "Co-op vs. AI",
    850: "Co-op vs. AI",
    450: "ARAM",
    400: "Draft Pick",
    430: "Blind Pick",
    900: "AR Ultra Rapid Fire"
  };