import React from "react"
import axios, { AxiosInstance } from "axios"
import { useAuth } from "./auth"

interface Props {
  children: React.ReactNode
}

interface IApi {
  apiClient: AxiosInstance
}

const ApiContext = React.createContext<IApi>({} as IApi)
export const useApi = () => React.useContext<IApi>(ApiContext)

const ApiProvider: React.FC = ({ children }) => {
  const auth = useAuth()
  const apiClient = axios.create()
  apiClient.interceptors.request.use((config) => {
    const token = auth.getToken()
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (response) => {
      return response
    },
    (err) => {
      if (err.response) {
        if (err.response.status === 401) {
          auth.logout()
        } else {
          throw err
        }
      }
    }
  )
  return (
    <ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>
  )
}
export default ApiProvider
