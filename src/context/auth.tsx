import React from "react"
import axios from "axios"
import { User } from "../interface/user/User"
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
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState<User | null>(null)
  React.useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  const retrieveUser = async () => {
    const axiosBase = axios.create()
    try {
      const user = await Check(axiosBase)
      setUser(user.data)
    } catch (e) {
      console.error(e)
      setToken("")
    } finally {
      setIsLoading(false)
    }
  }
  React.useEffect(() => {
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
        isAuthenticated: () => token !== "",
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
