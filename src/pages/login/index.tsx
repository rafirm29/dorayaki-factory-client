import React from "react"
import { Tabs, Input, Button } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
const { TabPane } = Tabs
import BG from "../../assets/bg.png"
export default () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <img src={BG} className="fixed w-full" />
      <h1>Pabrik Dorayaki</h1>
      <div className="w-full max-w-lg px-3">
        <Tabs defaultActiveKey="1" className="w-full mt-10">
          <TabPane tab="Login" key="1">
            <Login />
          </TabPane>
          <TabPane tab="Sign Up" key="2">
            <Register />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

const Login = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleLogin = () => {}
  return (
    <div>
      <Input
        value={email}
        placeholder="Email"
        prefix={<UserOutlined style={{ color: "#1890ff" }} className="mr-2" />}
        className="my-3 h-10"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input.Password
        value={password}
        placeholder="Password"
        prefix={<LockOutlined style={{ color: "#1890ff" }} className="mr-2" />}
        className="my-3 h-10"
        onChange={(e) => setPassword(e.target.value)}
      ></Input.Password>
      <Button type="primary" className="w-full my-3 h-10" onClick={handleLogin}>
        Sign In
      </Button>
    </div>
  )
}

const Register = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const handleRegister = () => {}
  return (
    <div>
      <Input
        value={email}
        placeholder="Email"
        prefix={<UserOutlined style={{ color: "#1890ff" }} className="mr-2" />}
        className="my-3 h-10"
        onChange={(e) => setEmail(e.target.value)}
      ></Input>
      <Input.Password
        value={password}
        placeholder="Password"
        prefix={<LockOutlined style={{ color: "#1890ff" }} className="mr-2" />}
        className="my-3 h-10"
        onChange={(e) => setPassword(e.target.value)}
      ></Input.Password>
      <Button
        type="primary"
        className="w-full my-3 h-10"
        onClick={handleRegister}
      >
        Sign Up
      </Button>
    </div>
  )
}