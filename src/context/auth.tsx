import React from "react"
import axios from "axios"
import { useAsync } from "react-async"
import { User } from "../interface/User"
import { Check } from "../api/auth"
interface Props {
  children: React.ReactNode
}

interface IAuth {
  getUser: () => User | null
  setUser: (user: User) => void
  isAuthenticated: () => boolean
  getToken: () => string
  setToken: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = React.createContext<IAuth>({} as IAuth)
export const useAuth = () => React.useContext<IAuth>(AuthContext)

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = React.useState<string>(
    localStorage.getItem("token") || ""
  )
  const [user, setUser] = React.useState<User | null>(null)
  React.useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  const [isLoading, setIsLoading] = React.useState(true)
  React.useEffect(() => {
    const axiosBase = axios.create()
    const retrieveUser = async () => {
      try {
        const user = await Check(axiosBase)
        setUser(user)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    retrieveUser()
  }, [])

  const logout = () => {
    setUser(null)
    setToken("")
  }

  return (
    <AuthContext.Provider
      value={{
        getUser: () => user,
        setUser,
        isAuthenticated: () => user !== null,
        getToken: () => token,
        setToken,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
