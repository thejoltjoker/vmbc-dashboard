import { model, Schema, Document, Model } from 'mongoose'

export interface Battle {
  playerTag: string
  battleLogId: string
  battleTime: Date
  brawlerId: string
  eventId: string
  clubLeague: boolean
  megaPig: boolean
  win: boolean
  starPlayer: boolean
}

export interface BattleDocument extends Battle, Document {}

export interface BattleModel extends Model<BattleDocument> {}

const BattleSchema = new Schema<BattleDocument>({
  _id: String,
  playerTag: { type: String, required: true },
  battleLogId: { type: String, required: true },
  battleTime: { type: Date, required: true },
  brawlerId: { type: String, required: true },
  eventId: { type: String, required: true },
  clubLeague: { type: Boolean, required: true },
  megaPig: { type: Boolean, required: true },
  win: { type: Boolean, required: true },
  starPlayer: { type: Boolean, required: true }
})

export default model<BattleDocument, BattleModel>('Battle', BattleSchema)
