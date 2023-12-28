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
  class: { id: number; name: string }
  rarity: { id: number; name: string; color: string }
  unlock: null
  description: string
  descriptionHtml: string
  starPowers: StarPower[]
  gadgets: Gadget[]
  videos: any[]
}
