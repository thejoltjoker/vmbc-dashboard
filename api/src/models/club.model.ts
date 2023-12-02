import mongoose, { Schema, Document } from 'mongoose'
interface IClubMember extends Document {
  tag: string
  name: string
  nameColor: string
  role: 'notMember' | 'member' | 'president' | 'senior' | 'vicePresident' | 'unknown' | string
  trophies: number
  icon: {
    id: number
  }
}
interface IClub extends Document {
  tag: string
  name: string
  description: string
  type: 'open' | 'inviteOnly' | 'closed' | 'unknown' | string
  badgeId: number
  requiredTrophies: number
  trophies: number
  members: IClubMember[]
}

const clubMemberSchema: Schema<IClubMember> = new Schema({
  tag: { type: String, required: true },
  name: { type: String, required: true },
  nameColor: { type: String, required: true },
  role: {
    type: String,
    enum: ['notMember', 'member', 'president', 'senior', 'vicePresident', 'unknown'],
    required: true
  },
  trophies: { type: Number, required: true },
  icon: {
    id: { type: Number, required: true }
  }
})

const clubSchema: Schema<IClub> = new Schema({
  _id: { type: String, required: true },
  tag: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ['open', 'inviteOnly', 'closed', 'unknown'],
    required: true
  },
  badgeId: { type: Number, required: true },
  requiredTrophies: { type: Number, required: true },
  trophies: { type: Number, required: true },
  members: { type: [clubMemberSchema], required: true }
})

const Club = mongoose.model<IClub>('Club', clubSchema)

export default Club
