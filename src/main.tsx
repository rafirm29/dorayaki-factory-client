import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes } from "react-router-dom"
import "./index.css"
import App from "./App"
import AuthProvider from "./context/auth"
import ApiProvider from "./context/api"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <BrowserRouter>
          <Routes>{App()}</Routes>
        </BrowserRouter>
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
