import { model, Schema, Document, Model } from 'mongoose'

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
}

export interface DBPlayer extends Player {
  // Custom fields
  winRate: number
  currentWinStreak: number
  bestWinStreak: number
  currentStarPlayerStreak: number
  bestStarPlayerStreak: number
}

export interface PlayerDocument extends Player, Document {
  // Custom fields
  winRate: number
  currentWinStreak: number
  bestWinStreak: number
  currentStarPlayerStreak: number
  bestStarPlayerStreak: number
}

export interface PlayerModel extends Model<PlayerDocument> {}

export interface PlayerBrawler {
  id: number
  name: string
  power: number
  rank: number
  trophies: number
  highestTrophies: number
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
  // Custom fields
  winRate?: number
  totalWins?: number
  totalBattles?: number
}

export interface DBPlayerBrawler extends PlayerBrawler {
  // Custom fields
  winRate: number
  totalWins: number
  totalBattles: number
}

export interface PlayerBrawlerModel extends Model<DBPlayerBrawler> {}

const PlayerBrawlerSchema = new Schema<DBPlayerBrawler>({
  id: Number,
  name: String,
  power: Number,
  rank: Number,
  trophies: Number,
  highestTrophies: Number,
  gears: [
    {
      id: Number,
      name: String,
      level: Number
    }
  ],
  starPowers: [
    {
      id: Number,
      name: String
    }
  ],
  gadgets: [
    {
      id: Number,
      name: String
    }
  ],
  // Custom fields
  winRate: { type: Number, default: 0 },
  totalWins: { type: Number, default: 0 },
  totalBattles: { type: Number, default: 0 }
})

const PlayerSchema = new Schema<PlayerDocument>({
  _id: String,
  tag: String,
  name: String,
  nameColor: String,
  icon: {
    id: Number
  },
  trophies: Number,
  highestTrophies: Number,
  expLevel: Number,
  expPoints: Number,
  isQualifiedFromChampionshipChallenge: Boolean,
  '3vs3Victories': Number,
  soloVictories: Number,
  duoVictories: Number,
  bestRoboRumbleTime: Number,
  bestTimeAsBigBrawler: Number,
  club: {
    tag: String,
    name: String
  },
  brawlers: [PlayerBrawlerSchema],
  // Custom
  winRate: { type: Number, default: 0 },
  currentWinStreak: { type: Number, default: 0 },
  bestWinStreak: { type: Number, default: 0 },
  currentStarPlayerStreak: { type: Number, default: 0 },
  bestStarPlayerStreak: { type: Number, default: 0 }
})

export default model<PlayerDocument, PlayerModel>('Player', PlayerSchema)
