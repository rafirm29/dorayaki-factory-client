import { AxiosInstance } from "axios"
import { User } from "../interface/User"
export const Check = (axios: AxiosInstance): Promise<User> => {
  const token = localStorage.getItem("token") || ""
  return axios
    .get("https://jsonplaceholder.typicode.com/users/1", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data as User)
}
