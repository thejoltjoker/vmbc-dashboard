export interface BrawlerStats {
  brawler: number
  winRate: number
  useRate: number
}

export interface Environment {
  id: number
  name: string
  hash: string
  path: string
  version: number
  imageUrl: string
}

export interface GameMode {
  id: number
  name: string
  hash: string
  version: number
  color: string
  bgColor: string
  link: string
  imageUrl: string
}

export interface Map {
  id: number
  new: boolean
  disabled: boolean
  name: string
  hash: string
  version: number
  link: string
  imageUrl: string
  credit: string
  environment: Environment
  gameMode: GameMode
  lastActive: number
  dataUpdated: number
  stats: BrawlerStats[]
  teamStats: any[] // No information provided for teamStats
}
