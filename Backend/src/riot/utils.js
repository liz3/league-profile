import fs from "node:fs"
const HostMap = {
    BR1: "br1.api.riotgames.com",
    EUN1: "eun1.api.riotgames.com",
    EUW1: "euw1.api.riotgames.com",
    JP1: "jp1.api.riotgames.com",
    KR: "kr.api.riotgames.com",
    LA1: "la1.api.riotgames.com",
    LA2: "la2.api.riotgames.com",
    NA1: "na1.api.riotgames.com",
    OC1: "oc1.api.riotgames.com",
    TR1: "tr1.api.riotgames.com",
    RU: "ru.api.riotgames.com",
};
const KeyHostMap = {
    br: "BR1",
    eune: "EUN1",
    euw: "EUW1",
    jp: "JP1",
    kr: "KR",
    "la-one": "LA1",
    "la-two": "LA2",
    na: "NA1",
    oc: "OC1",
    tr: "TR1",
    ru: "RU",
};
export const getMatchRouting = (key) => {
    switch (key) {
        case "na":
        case "br":
        case "la-one":
        case "la-two":
        case "oc":
            return "americas";
        case "kr":
        case "jp":
            return "asia";
        default:
            return "europe";
    }
};
const titles = JSON.parse(fs.readFileSync("./src/static//titles.json"));
export const getTitle = (id) => {
    return titles.find(e => e.itemId.toString() === id)?.titleName || null;
};
export const getHostFromKey = (key) => {
    if (["AMERICAS", "ASIA", "EUROPE"].includes(key.toUpperCase()))
        return `${key.toLowerCase()}.api.riotgames.com`;
    if (HostMap[key.toUpperCase()]) return HostMap[key.toUpperCase()];
    if (!KeyHostMap[key]) return null;
    return HostMap[KeyHostMap[key]];
};
