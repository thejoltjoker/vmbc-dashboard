import { model, Schema, Document, Model } from 'mongoose'

export interface Member {
  icon: { id: number }
  tag: string
  name: string
  trophies: number
  role: 'notMember' | 'member' | 'president' | 'senior' | 'vicePresident' | 'unknown' | string
  nameColor: string
  winRate: number
  lastPlayed: Date
  currentWinStreak: Number
  bestWinStreak: Number
  currentStarPlayerStreak: Number
  bestStarPlayerStreak: Number
}

export interface MemberDocument extends Member, Document {}

export interface MemberModel extends Model<MemberDocument> {}

const MemberSchema = new Schema<MemberDocument>({
  _id: String,
  icon: Object,
  tag: String,
  name: String,
  trophies: Number,
  role: {
    type: String,
    enum: ['notMember', 'member', 'president', 'senior', 'vicePresident', 'unknown'],
    required: true
  },
  nameColor: String,
  winRate: Number,
  currentWinStreak: Number,
  bestWinStreak: Number,
  currentStarPlayerStreak: Number,
  bestStarPlayerStreak: Number,
  lastPlayed: Date
})

export default model<MemberDocument, MemberModel>('Member', MemberSchema)
