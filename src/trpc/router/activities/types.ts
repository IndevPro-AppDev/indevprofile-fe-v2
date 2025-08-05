export interface ActivityResponseData {
  id: number
  title: string
  description: string
  image: string
  created_at: string | null
  updated_at: string | null
}

export interface Activity {
  id: number
  title: string
  description: string
  image: string
}
