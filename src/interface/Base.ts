enum ResponseStatus {
  OK = "ok",
  UNAUTHORIZED = "unauthorized",
  ERROR = "error",
}

export interface BaseResponse {
  status_code: ResponseStatus
  data: any
}
