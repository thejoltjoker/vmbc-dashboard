import mongoose, { Schema, Document } from 'mongoose'

interface PlayerBrawler {
  id: number
  name: string
  power: number
  rank: number
  trophies: number
  highestTrophies: number
  winRate?: number
  totalWins?: number
  totalBattles?: number
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

interface Player extends Document {
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

const playerBrawlerSchema = new Schema<PlayerBrawler>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  power: { type: Number, required: true },
  rank: { type: Number, required: true },
  trophies: { type: Number, required: true },
  highestTrophies: { type: Number, required: true },
  winRate: { type: Number, default: 0 },
  totalWins: { type: Number, default: 0 },
  totalBattles: { type: Number, default: 0 },
  gears: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      level: { type: Number, required: true }
    }
  ],
  starPowers: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true }
    }
  ],
  gadgets: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true }
    }
  ]
})

const playerSchema: Schema<Player> = new Schema({
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
  brawlers: [playerBrawlerSchema]
})

const PlayerModel = mongoose.model<Player>('Player', playerSchema)

export { Player, PlayerModel }
