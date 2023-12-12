export interface PlayerBrawler {
  id: number
  name: string
  power: number
  rank: number
  trophies: number
  highestTrophies: number
  winRate: number
  totalWins: number
  totalBattles: number
  gears: {
    id: number
    name: string
    level: number
  }[]
  starPowers: {
    id: number
    name: string
  }[]
  gadgets: {
    id: number
    name: string
  }[]
}

export interface Player {
  tag: string
  name: string
  nameColor: string
  icon: {
    id: number
  }
  trophies: number
  highestTrophies: number
  expLevel: number
  expPoints: number
  isQualifiedFromChampionshipChallenge: boolean
  '3vs3Victories': number
  soloVictories: number
  duoVictories: number
  bestRoboRumbleTime: number
  bestTimeAsBigBrawler: number
  club: {
    tag: string
    name: string
  }
  brawlers: PlayerBrawler[]
  winRate: number
}
