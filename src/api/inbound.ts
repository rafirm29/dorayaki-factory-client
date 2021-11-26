import { AxiosInstance } from "axios"
import { Inbound } from "../interface/inbound/Inbound"
import { BasePaginationResponse } from "../interface/Base"

export const GetAllInbound = (
  axios: AxiosInstance,
  page: number
): Promise<BasePaginationResponse<Inbound>> => {
  return axios
    .get("/api/inbound", {
      params: {
        page,
      },
    })
    .then((response) => response.data as BasePaginationResponse<Inbound>)
}
