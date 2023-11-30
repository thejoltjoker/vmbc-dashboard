import Team from "./Team";

export default interface Battle {
  mode: string;
  type: string;
  rank?: number;
  result?: string;
  trophyChange: number;
  teams: Team;
}
