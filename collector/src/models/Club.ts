import mongoose, { Schema, Document } from "mongoose";
import { ClubMember, clubMemberSchema } from "./ClubMember";

interface Club extends Document {
  tag: string;
  name: string;
  description: string;
  type: "open" | "inviteOnly" | "closed" | "unknown" | string;
  badgeId: number;
  requiredTrophies: number;
  trophies: number;
  members: ClubMember[];
}

const clubSchema: Schema<Club> = new Schema({
  _id: { type: String, required: true },
  tag: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: ["open", "inviteOnly", "closed", "unknown"],
    required: true,
  },
  badgeId: { type: Number, required: true },
  requiredTrophies: { type: Number, required: true },
  trophies: { type: Number, required: true },
  members: { type: [clubMemberSchema], required: true },
});

const ClubModel = mongoose.model<Club>("Club", clubSchema);

export { Club, ClubModel };
