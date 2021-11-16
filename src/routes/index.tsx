import React from "react"
import { Route } from "react-router-dom"
import RouteGuard, { RouteProps } from "./routeGuard"
import Login from "../pages/login"
import Home from "../pages/home"
const routes: RouteProps[] = [
  {
    Component: Home,
    path: "/",
  },
  {
    Component: Login,
    path: "/login",
    beforeLoggedIn: true,
  },
]

const renderRoutes = () => {
  return routes.map((route) => (
    <Route
      key={route.path}
      path={route.path}
      element={
        <RouteGuard {...route}>
          <route.Component></route.Component>
        </RouteGuard>
      }
    ></Route>
  ))
}

export default renderRoutes
