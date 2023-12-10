export interface Member {
  icon: { id: number }
  tag: string
  name: string
  trophies: number
  role: 'notMember' | 'member' | 'president' | 'senior' | 'vicePresident' | 'unknown' | string
  nameColor: string
  winRate: number
  lastPlayed: Date
}
