import React from "react"
import { Route } from "react-router-dom"
import RouteGuard from "./routeGuard"
import Login from "../pages/login/index"
const routes = [
  {
    Component: Login,
    path: "/login",
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
