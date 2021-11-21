export interface LoginRequest {
  email: String
  password: String
}

export interface RegisterRequest extends LoginRequest {}
