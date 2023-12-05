export interface ClubIcon {
  id: number
  imageUrl: string
}
export interface PlayerIcon {
  id: number
  name: string
  name2: string
  imageUrl: string
  imageUrl2: string
  brawler: any // You might want to specify the type for brawler if you have more information
  requiredTotalTrophies: number
  sortOrder: number
  isReward: boolean
  isAvailableForOffers: boolean
}

export interface Icons {
  player: Record<string, PlayerIcon>
  club: Record<string, ClubIcon> // Add an index signature here
}
