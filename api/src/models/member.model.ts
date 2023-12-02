import mongoose, { Schema, Document } from 'mongoose'

interface IMember extends Document {
  icon: { id: number }
  tag: string
  name: string
  trophies: number
  role: 'notMember' | 'member' | 'president' | 'senior' | 'vicePresident' | 'unknown' | string
  nameColor: string
  winRate: number
  lastPlayed: Date
}

const memberSchema: Schema<IMember> = new Schema({
  _id: String,
  icon: { type: Object, required: true },
  tag: { type: String, required: true },
  name: { type: String, required: true },
  trophies: { type: Number, required: true },
  role: {
    type: String,
    enum: ['notMember', 'member', 'president', 'senior', 'vicePresident', 'unknown'],
    required: true
  },
  nameColor: { type: String, required: false },
  winRate: { type: Number, required: true },
  lastPlayed: { type: Date, required: true }
})

const Member = mongoose.model<IMember>('Member', memberSchema)

export default Member
