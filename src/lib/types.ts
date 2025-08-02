export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T | null
  meta?: ApiResponseMeta
}

export interface ApiResponseMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}
