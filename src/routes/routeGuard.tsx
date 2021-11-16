import React from "react"
import { Navigate, Route as ReactRouterDomRoute } from "react-router-dom"
import { useAuth } from "../context/auth"
type RouteProps = {
  Component: React.ComponentType
  beforeLoggedIn?: boolean
  afterLoggedIn?: boolean
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
