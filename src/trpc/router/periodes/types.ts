export interface PeriodeResponseData {
  id: number
  name: string
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export type Periode = Pick<PeriodeResponseData, 'id' | 'name'>
