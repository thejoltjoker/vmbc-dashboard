export interface Class {
  id: number
  name: string
}

export interface Rarity {
  id: number
  name: string
  color: string
}

export interface StarPower {
  id: number
  name: string
  path: string
  version: number
  description: string
  descriptionHtml: string
  imageUrl: string
  released: boolean
}

export interface Gadget {
  id: number
  name: string
  path: string
  version: number
  description: string
  descriptionHtml: string
  imageUrl: string
  released: boolean
}

export interface Brawler {
  id: number
  avatarId: number
  name: string
  hash: string
  path: string
  fankit: string
  released: boolean
  version: number
  link: string
  imageUrl: string
  imageUrl2: string
  imageUrl3: string
  class: Class
  rarity: Rarity
  unlock: any // You might want to specify the type for unlock if you have more information
  description: string
  descriptionHtml: string
  starPowers: StarPower[]
  gadgets: Gadget[]
  videos: any[] // You might want to specify the type for videos if you have more information
}
