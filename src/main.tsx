import React from 'react'
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import AuthProvider from "./context/auth"
import ApiProvider from "./context/api"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
