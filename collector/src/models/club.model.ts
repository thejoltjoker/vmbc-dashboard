import { model, Schema, Document, Model } from 'mongoose'

export interface ClubMember {
  tag: string
  name: string
  nameColor: string
  role: 'notMember' | 'member' | 'president' | 'senior' | 'vicePresident' | 'unknown' | string
  trophies: number
  icon: {
    id: number
  }
}

const ClubMemberSchema = new Schema<ClubMember>({
  tag: String,
  name: String,
  nameColor: String,
  role: {
    type: String,
    enum: ['notMember', 'member', 'president', 'senior', 'vicePresident', 'unknown'],
    required: true
  },
  trophies: Number,
  icon: {
    id: Number
  }
})

export interface Club {
  tag: string
  name: string
  description: string
  type: 'open' | 'inviteOnly' | 'closed' | 'unknown' | string
  badgeId: number
  requiredTrophies: number
  trophies: number
  members: ClubMember[]
}

export interface ClubDocument extends Club, Document {}

export interface ClubModel extends Model<ClubDocument> {}

const ClubSchema = new Schema<ClubDocument>({
  _id: String,
  tag: String,
  name: String,
  description: String,
  type: {
    type: String,
    enum: ['open', 'inviteOnly', 'closed', 'unknown'],
    required: true
  },
  badgeId: Number,
  requiredTrophies: Number,
  trophies: Number,
  members: [ClubMemberSchema]
})

export default model<ClubDocument, ClubModel>('Club', ClubSchema)
