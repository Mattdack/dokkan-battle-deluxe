import { countBy } from "lodash";

const linkSkillDictionary = {
  HighCompatibility: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  Courage: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK +10%",
  },
  TheStudents: {
    lvl1_stats: "DEF +20%",
    lvl10_stats: "DEF +30%",
  },
  TheInnocents: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  CraneSchool: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  DemonicWays: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  DemonicPower: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +20% and DEF +10%",
  },
  Brainiacs: {
    lvl1_stats: "ATK & DEF +10%",
    lvl10_stats: "ATK & DEF +15%",
  },
  GoldenWarrior: {
    lvl1_stats: "All enemies' DEF -5% and Ki +1",
    lvl10_stats: "All enemies' DEF -10% and Ki +1",
  },
  MoneyMoneyMoney: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  EvilAutocrats: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "All enemies' DEF -20% and Ki +2",
  },
  Flee: {
    lvl1_stats: "Ki +1 when HP is 30% or less",
    lvl10_stats:
      "Ki +2 and chance of evading enemy's attack (including Super Attack) +10% when HP is 50% or less",
  },
  Telekinesis: {
    lvl1_stats: "All enemies' DEF -10%",
    lvl10_stats: "All enemies' DEF -20%",
  },
  MoreThanMeetstheEye: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK & DEF +10%",
  },
  Hero: {
    lvl1_stats: "DEF +20%",
    lvl10_stats: "DEF +25%",
  },
  SupremeWarrior: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK +10%",
  },
  Gentleman: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +10%",
  },
  BrutalBeatdown: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  MessengerfromtheFuture: {
    lvl1_stats: "ATK +5%",
    lvl10_stats: "ATK +10%",
  },
  WorldTournamentReborn: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  New: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK & DEF +20%",
  },
  SaiyanWarriorRace: {
    lvl1_stats: "ATK +5%",
    lvl10_stats: "ATK +10%",
  },
  AllintheFamily: {
    lvl1_stats: "DEF +15%",
    lvl10_stats: "DEF +20%",
  },
  Telepathy: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and chance of performing a critical hit +5%",
  },
  Respect: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  Prodigies: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  WorldTournamentChampion: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and DEF +10%",
  },
  Metamorphosis: {
    lvl1_stats: "Recovers 5% HP",
    lvl10_stats: "Recovers 5% HP and ATK & DEF +10%",
  },
  SuperSaiyan: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  ExperiencedFighters: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  TwinTerrors: {
    lvl1_stats: "Ki +2",
    lvl10_stats:
      "Ki +2 and ATK, DEF & chance of evading enemy's attack (including Super Attack) +5%",
  },
  Coward: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and chance of performing a critical hit +5%",
  },
  AttackoftheClones: {
    lvl1_stats: "Ki +1",
    lvl10_stats:
      "Ki +2 and chance of evading enemy's attack (including Super Attack) +5%",
  },
  TheSaiyanLineage: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK & DEF +5%",
  },
  AndroidAssault: {
    lvl1_stats: "DEF +10%",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  TurtleSchool: {
    lvl1_stats: "ATK & DEF +10%",
    lvl10_stats: "Ki +2 and ATK & DEF +20%",
  },
  SolidSupport: {
    lvl1_stats: "ATK +10% and all enemies' DEF -15%",
    lvl10_stats: "ATK +15% and all enemies' DEF -20%",
  },
  MechanicalMenaces: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and reduces damage received by 5%",
  },
  ColdJudgment: {
    lvl1_stats: "DEF +20%",
    lvl10_stats: "DEF +25%",
  },
  RoyalLineage: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK +5%",
  },
  TheGinyuForce: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK +25% and chance of performing a critical hit +5%",
  },
  Infighter: {
    lvl1_stats: "ATK +10% and all enemies' DEF -10%",
    lvl10_stats: "ATK +15% and all enemies' DEF -15%",
  },
  FriezasMinion: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +20% and DEF +10%",
  },
  ChampionsStrength: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and reduces damage received by 5%",
  },
  ZFighters: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  DodonRay: {
    lvl1_stats: "ATK +10% when performing a Super Attack",
    lvl10_stats: "ATK +15% when performing a Super Attack",
  },
  Kamehameha: {
    lvl1_stats: "ATK +5% when performing a Super Attack",
    lvl10_stats: "ATK +10% when performing a Super Attack",
  },
  Namekians: {
    lvl1_stats: "Recovers 5% HP",
    lvl10_stats: "Recovers 7% HP and ATK & DEF +7%",
  },
  Berserker: {
    lvl1_stats: "ATK +20% when HP is 50% or less",
    lvl10_stats: "ATK +30% when HP is 50% or less",
  },
  BigBadBosses: {
    lvl1_stats: "ATK & DEF +25% when HP is 80% or less",
    lvl10_stats: "ATK & DEF +25%",
  },
  FriezasArmy: {
    lvl1_stats: "DEF +20%",
    lvl10_stats: "ATK +10% and DEF +20%",
  },
  ToughasNails: {
    lvl1_stats: "DEF +15%",
    lvl10_stats: "DEF +20% and reduces damage received by 5%",
  },
  SpeedyRetribution: {
    lvl1_stats: "ATK +10%",
    lvl10_stats:
      "ATK +15% and chance of evading enemy's attack (including Super Attack) +5%",
  },
  TagTeamofTerror: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  RRArmy: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK & DEF +10%",
  },
  GazeofRespect: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  Bombardment: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  Over9000: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK & DEF +10%",
  },
  UniversesMostMalevolent: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  ShockingSpeed: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +5%",
  },
  FamilyTies: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK +10%",
  },
  TeamBardock: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  SaiyanPride: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  BattlefieldDiva: {
    lvl1_stats: "Ki +2",
    lvl10_stats:
      "Ki +3 and chance of evading enemy's attack (including Super Attack) +5%",
  },
  Revival: {
    lvl1_stats: "Ki +2",
    lvl10_stats:
      "Ki +2; ATK & DEF +5% and recovers 5% HP when HP is 50% or less",
  },
  DismalFuture: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and chance of performing a critical hit +5%",
  },
  OrganicUpgrade: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK, DEF & chance of performing a critical hit +5%",
  },
  ResurrectionF: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "Ki +1 and ATK & DEF +10%",
  },
  Patrol: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  WarriorGods: {
    lvl1_stats: "ATK +10%",
    lvl10_stats:
      "ATK +10%; plus an additional ATK +5% when performing a Super Attack",
  },
  SuperGodCombat: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  NewFriezaArmy: {
    lvl1_stats: "ATK & DEF +20%",
    lvl10_stats: "ATK & DEF +25%",
  },
  Loyalty: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and reduces damage received by 5%",
  },
  UnbreakableBond: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  GalacticVisitor: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  MasterofMagic: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +15% and all enemies' DEF -10%",
  },
  MajinResurrectionPlan: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  Connoisseur: {
    lvl1_stats: "Recovers 5% HP",
    lvl10_stats: "Recovers 7% HP and DEF +7%",
  },
  GodlyPower: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +15% and chance of performing a critical hit +5%",
  },
  EnergyAbsorption: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and recovers 3% HP",
  },
  BuddingWarrior: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  Majin: {
    lvl1_stats: "ATK & DEF +10%",
    lvl10_stats: "Ki +2 and ATK & DEF +15%",
  },
  StrengthinUnity: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and recovers 3% HP",
  },
  StrongestClaninSpace: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "All enemies' DEF -10% and Ki +2",
  },
  ThirstforConquest: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK & DEF +15%",
  },
  TheHeraClan: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & chance of performing a critical hit +5%",
  },
  GalacticWarriors: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "Ki +2 and ATK & DEF +20%",
  },
  OverinaFlash: {
    lvl1_stats: "Ki +3",
    lvl10_stats: "Ki +3 and ATK +7%",
  },
  TheIncredibleAdventure: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and ATK & DEF +7%",
  },
  CoolersUnderling: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and chance of performing a critical hit +5%",
  },
  CoolersArmoredSquad: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK & DEF +25%",
  },
  HeroofJustice: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK +25% and chance of performing a critical hit +5%",
  },
  SignaturePose: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and ATK +7%",
  },
  GT: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  InfiniteRegeneration: {
    lvl1_stats: "Recovers 3% HP",
    lvl10_stats: "Ki +2, recovers 3% HP and DEF +10%",
  },
  PreparedforBattle: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +5%",
  },
  DestroyeroftheUniverse: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK +25% and DEF +15%",
  },
  TeamTurles: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and chance of performing a critical hit +5%",
  },
  FortunetellerBabasFighter: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and ATK & DEF +5%",
  },
  GuidanceoftheDragonBalls: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +20% and chance of performing a critical hit +7%",
  },
  PowerBestowedbyGod: {
    lvl1_stats: "ATK +5% when performing a Super Attack",
    lvl10_stats: "ATK +10% when performing a Super Attack",
  },
  HardenedGrudge: {
    lvl1_stats: "Ki +1",
    lvl10_stats: "Ki +2 and ATK +10%",
  },
  AutoRegeneration: {
    lvl1_stats: "Recovers 3% HP",
    lvl10_stats: "Recovers 5% HP and reduces damage received by 5%",
  },
  Fusion: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +10%",
  },
  DeficitBoost: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  UltimateLifeform: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2, recovers 3% HP and ATK & DEF +10%",
  },
  FierceBattle: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  InfiniteEnergy: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK, DEF & chance of performing a critical hit +5%",
  },
  FormidableEnemy: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  FusedFighter: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +5%",
  },
  FusionFailure: {
    lvl1_stats: "Recovers 3% HP",
    lvl10_stats: "Recovers 7% HP",
  },
  Scientist: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and DEF +20%",
  },
  HatredofSaiyans: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and ATK +10%",
  },
  LimitBreakingForm: {
    lvl1_stats: "ATK +5% when performing a Super Attack",
    lvl10_stats: "ATK +10% when performing a Super Attack",
  },
  TheFirstAwakened: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK +25% and DEF +10%",
  },
  ShatteringtheLimit: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +5%",
  },
  Nightmare: {
    lvl1_stats: "ATK +10%",
    lvl10_stats: "ATK +15%",
  },
  FearandFaith: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "All enemies' DEF -10% and Ki +2",
  },
  Xenoverse: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +20% and DEF +10%",
  },
  SuperStrike: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +25%",
  },
  Transform: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and DEF +10%",
  },
  SaiyanRoar: {
    lvl1_stats: "ATK +25%",
    lvl10_stats: "ATK +25% and DEF +10%",
  },
  LegendaryPower: {
    lvl1_stats: "ATK +10% when performing a Super Attack",
    lvl10_stats: "ATK +15% when performing a Super Attack",
  },
  WarriorsofUniverse6: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +2 and ATK & DEF +6%",
  },
  ShadowDragons: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK & DEF +20%",
  },
  PenguinVillageAdventure: {
    lvl1_stats: "ATK +15%",
    lvl10_stats: "ATK +20%",
  },
  OtherworldWarriors: {
    lvl1_stats: "ATK +20%",
    lvl10_stats: "ATK +20% and DEF +10%",
  },
  TournamentofPower: {
    lvl1_stats: "Ki +3",
    lvl10_stats: "Ki +3 and ATK & DEF +7%",
  },
  BlazingBattle: {
    lvl1_stats: "Disables enemy's Rampage; ATK +15%",
    lvl10_stats: "Disables enemy's Rampage; ATK +20%",
  },
  SoulvsSoul: {
    lvl1_stats: "Weakens enemy's Regeneration; Ki +1",
    lvl10_stats: "Weakens enemy's Regeneration; Ki +2 and ATK & DEF +5%",
  },
  GoldenZFighter: {
    lvl1_stats: "Ki +2",
    lvl10_stats: "Ki +3 and chance of performing a critical hit +5%",
  },
  SupremePower: {
    lvl1_stats: "ATK & DEF +5% and activates Penetration",
    lvl10_stats: "ATK & DEF +10% and activates Penetration",
  },
  TheWallStandingTall: {
    lvl1_stats: "Disables enemy's True Power; ATK +15%",
    lvl10_stats: "Disables enemy's True Power; ATK +20%",
  },
};

export const getLinkSkillInfo = (linkskill) => {
  const searchKey = linkskill.trim().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
  const result = Object.entries(linkSkillDictionary).find( link => link[0] === searchKey)
  if (!result) return;
  const [linkName, {lvl1_stats: lvl1, lvl10_stats: lvl10}] = result
  return ([linkName, lvl1, lvl10])
};

export const getLvl1LinkSkillInfo = (linkskill) => {
  const searchKey = linkskill.trim().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
  const result = Object.entries(linkSkillDictionary).find( link => link[0] === searchKey)
  if (!result) return;
  const [linkName, {lvl1_stats: lvl1, lvl10_stats: lvl10}] = result
  return (lvl1)
};

export const getLvl10LinkSkillInfo = (linkskill) => {
  const searchKey = linkskill.trim().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
  const result = Object.entries(linkSkillDictionary).find( link => link[0] === searchKey)
  if (!result) return;
  const [linkName, {lvl1_stats: lvl1, lvl10_stats: lvl10}] = result
  return (lvl10)
};

export const getLinkSkillInfoObject = (linkskill) => {
  const searchKey = linkskill.trim().replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
  const result = Object.entries(linkSkillDictionary).find( link => link[0] === searchKey)
  if (!result) return;
  const [linkName, {lvl1_stats: lvl1, lvl10_stats: lvl10}] = result
  return { [linkName]: { lvl1, lvl10 } }
};


export function findMatchingLinks(source, target) {
  return source.filter(elem => target.includes(elem))
}
