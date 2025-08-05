export interface DivisionResponseData {
  id: number
  name: string
  slug: string
  desc: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  sort_order?: number | null
}

export type Division = Pick<DivisionResponseData, 'id' | 'name'>
