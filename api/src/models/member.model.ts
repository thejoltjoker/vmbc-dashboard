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
  lastPlayed: Date
})

export default model<MemberDocument, MemberModel>('Member', MemberSchema)
