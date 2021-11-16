import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/auth"
export type RouteProps = {
  Component: React.ComponentType
  beforeLoggedIn?: boolean
  afterLoggedIn?: boolean
  path?: string
}

export default ({
  Component,
  beforeLoggedIn = false,
  afterLoggedIn = false,
}: RouteProps) => {
  const auth = useAuth()
  if (afterLoggedIn && !auth.isAuthenticated()) {
    return <Navigate to="/" />
  }
  if (beforeLoggedIn && auth.isAuthenticated()) {
    return <Navigate to="/" />
  }
  return <Component />
}
