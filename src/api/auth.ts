import { AxiosInstance } from "axios"
import { LoginRequest, RegisterRequest } from "../interface/user/Request"
import { LoginResponse, RegisterResponse } from "../interface/user/Response"
import Config from "../config"
export const Check = (axios: AxiosInstance): Promise<LoginResponse> => {
  const token = localStorage.getItem("token") || ""
  return axios
    .get(`${Config.API_URL}/api/auth/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data as LoginResponse)
}

export const Login = (
  axios: AxiosInstance,
  data: LoginRequest
): Promise<LoginResponse> => {
  return axios
    .post("/api/auth/login", data)
    .then((response) => response.data as LoginResponse)
}

export const Register = (
  axios: AxiosInstance,
  data: RegisterRequest
): Promise<RegisterResponse> => {
  return axios
    .post("/api/auth/register", data)
    .then((response) => response.data as RegisterResponse)
}