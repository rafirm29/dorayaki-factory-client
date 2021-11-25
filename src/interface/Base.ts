enum ResponseStatus {
  OK = "ok",
  UNAUTHORIZED = "unauthorized",
  ERROR = "error",
}

export interface BaseResponse {
  status_code: ResponseStatus
  data: any
}

interface PaginationResponse<T> {
  itemPerPage: number
  items: T[]
  maxPage: number
  page: number
  totalItems: number
}

export interface BasePaginationResponse<T> extends BaseResponse {
  data: PaginationResponse<T>
}