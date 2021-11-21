import React from 'react'
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import AuthProvider from "./context/auth"
import ApiProvider from "./context/api"

ReactDOM.render(
  <AuthProvider>
    <ApiProvider>
      <App />
    </ApiProvider>
  </AuthProvider>,
  document.getElementById("root")
)
