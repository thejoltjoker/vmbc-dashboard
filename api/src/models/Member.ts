import mongoose, { Schema, Document } from "mongoose";

interface Member extends Document {
  iconId: number;
  tag: string;
  name: string;
  trophies: number;
  role:
    | "notMember"
    | "member"
    | "president"
    | "senior"
    | "vicePresident"
    | "unknown"
    | string;
  nameColor: string;
  winRate: number;
  lastPlayed: Date;
}

const memberSchema: Schema<Member> = new Schema({
  _id: String,
  iconId: { type: Number, required: true },
  tag: { type: String, required: true },
  name: { type: String, required: true },
  trophies: { type: Number, required: true },
  role: {
    type: String,
    enum: [
      "notMember",
      "member",
      "president",
      "senior",
      "vicePresident",
      "unknown",
    ],
    required: true,
  },
  nameColor: { type: String, required: false },
  winRate: { type: Number, required: true },
  lastPlayed: { type: Date, required: true },
});

const MemberModel = mongoose.model<Member>("Member", memberSchema);

export { Member, MemberModel };
