import { BaseResponse } from "../Base"
import { User } from "./User"

export interface TokenResponse {
  token: string
  user: User
}

export interface RegisterResponse extends BaseResponse {
  data: User
}

export interface LoginResponse extends BaseResponse {
  data: TokenResponse
}
