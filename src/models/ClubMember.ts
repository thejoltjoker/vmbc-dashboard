import PlayerIcon from "./PlayerIcon";

interface ClubMember {
  icon: PlayerIcon;
  tag: string;
  name: string;
  trophies: number;
  role:
    | "notMember"
    | "member"
    | "president"
    | "senior"
    | "vicePresident"
    | "unknown";
  nameColor: string;
}

export default ClubMember;
