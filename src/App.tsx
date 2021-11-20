import React from "react"
import { Spin } from "antd"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import { useAuth } from "./context/auth"
import { routes } from "./routes"
import RouteGuard from "./routes/routeGuard"
import "./App.css"

const App = () => {
  const auth = useAuth()
  if (auth.isLoading) {
    return <LoadingOverlay />
  }
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <RouteGuard {...route}>
                <route.Component></route.Component>
              </RouteGuard>
            }
          ></Route>
        ))}
      </Routes>
    </BrowserRouter>
  )
}

const LoadingOverlay = () => {
  return (
    <div className="h-screen w-screen bg-gray-500 bg-opacity-25 flex flex-col items-center justify-center">
      <Spin size="large" />
      <p className="mt-3">Fetching data from server</p>
    </div>
  )
}

export default App
