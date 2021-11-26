import { AxiosInstance } from "axios"
import { Inbound } from "../interface/inbound/Inbound"
import { BasePaginationResponse, BaseResponse } from "../interface/Base"

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

export const AcceptInbound = (
    axios: AxiosInstance,
    id: number
): Promise<BasePaginationResponse<Inbound>> => {
    return axios
        .get("/api/inbound/accept/" + id)
        .then((response) => response.data as BaseResponse)
}
  