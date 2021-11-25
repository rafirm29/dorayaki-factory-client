import { BaseResponse } from "../Base"

export interface FileResponse extends BaseResponse {
  data: FileUrl
}

interface FileUrl {
  url: string
}
