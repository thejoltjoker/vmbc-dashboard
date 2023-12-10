import mongoose, { Schema, Document } from 'mongoose'

interface IBattle extends Document {
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

const battleSchema: Schema<IBattle> = new Schema({
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

const Battle = mongoose.model('Battle', battleSchema)

export default Battle
