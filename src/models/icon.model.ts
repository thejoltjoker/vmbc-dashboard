export interface ClubIcon {
  id: number
  imageUrl: string
}
export interface PlayerIcon {
  id: number
  imageUrl: string
}

export interface Icons {
  player: Record<string, PlayerIcon>
  club: Record<string, ClubIcon> // Add an index signature here
}
