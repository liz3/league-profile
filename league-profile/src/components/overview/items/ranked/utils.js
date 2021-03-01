import IronEmblem from "../../../../assets/img/ranked/Emblem_Iron.png";
import BronzeEmblem from "../../../../assets/img/ranked/Emblem_Bronze.png";
import SilverEmblem from "../../../../assets/img/ranked/Emblem_Silver.png";
import GoldEmblem from "../../../../assets/img/ranked/Emblem_Gold.png";
import PlatinumEmblem from "../../../../assets/img/ranked/Emblem_Platinum.png";
import DiamondEmblem from "../../../../assets/img/ranked/Emblem_Diamond.png";
import MasterEmblem from "../../../../assets/img/ranked/Emblem_Master.png";
import GrandMasterEmblem from "../../../../assets/img/ranked/Emblem_Grandmaster.png";
import ChallengerEmblem from "../../../../assets/img/ranked/Emblem_Challenger.png";

export const Emblems = {
  IRON: IronEmblem,
  BRONZE: BronzeEmblem,
  SILVER: SilverEmblem,
  GOLD: GoldEmblem,
  PlATINUM: PlatinumEmblem,
  DIAMOND: DiamondEmblem,
  MASTER: MasterEmblem,
  GRANDMASTER: GrandMasterEmblem,
  CHALLENGER: ChallengerEmblem,
};

const RANKED_KEYS = Object.keys(Emblems).reverse();

const RANKED_RANK_TIER = ["I", "II", "III", "IV"];

export const sortRanked = (entries) => {
  return entries
    .sort((a, b) => b.leaguePoints - a.leaguePoints)
    .sort(
      (a, b) =>
        RANKED_RANK_TIER.indexOf(a.rank) - RANKED_RANK_TIER.indexOf(b.rank)
    )
    .sort((a, b) => RANKED_KEYS.indexOf(a.tier) - RANKED_KEYS.indexOf(b.tier));
};
export const QueueNames = {
  RANKED_SOLO_5x5: "SOLO/DUO",
  RANKED_FLEX_SR: "FLEX 5V5",
  RANKED_TFT: "TFT",
};
