export interface ListHeaderField {
  id: string
  title: string
  sortable: boolean
}

export interface ListItemImage {
  src: string
  fallback: string
  alt: string
}

export interface ListItemField {
  key: string
  value: any
}
export interface ListItem {
  id: string
  img: ListItemImage
  fields: ListItemField[]
  link: string
}
