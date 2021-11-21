import React from "react"
import { useNavigate } from "react-router"
import { Tabs, Input, Button, Form } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useApi } from "../../context/api"
import { useAuth } from "../../context/auth"
import { Register as RegisterAPI, Login as LoginAPI } from "../../api/auth"
import { RegisterRequest, LoginRequest } from "../../interface/user/Request"
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
  const api = useApi()
  const auth = useAuth()
  const navigate = useNavigate()
  const handleLogin = (values: LoginRequest) => {
    LoginAPI(api.apiClient, values).then((response) => {
      auth.setToken(response.data.token)
      navigate("/ingredients")
    })
  }
  return (
    <Form onFinish={handleLogin}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!!" },
          { type: "email", message: "Please input a valid email" },
        ]}
      >
        <Input
          placeholder="Email"
          prefix={
            <UserOutlined style={{ color: "#1890ff" }} className="mr-2" />
          }
          className="my-3 h-10"
        ></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!!" }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={
            <LockOutlined style={{ color: "#1890ff" }} className="mr-2" />
          }
          className="my-3 h-10"
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="w-full my-3 h-10" htmlType="submit">
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

const Register = () => {
  const api = useApi()
  const handleRegister = (values: RegisterRequest) => {
    RegisterAPI(api.apiClient, values)
      .then(() => alert("Registration success"))
      .then(() => window.location.reload())
  }
  return (
    <Form onFinish={handleRegister}>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!!" },
          { type: "email", message: "Please input a valid email" },
        ]}
      >
        <Input
          placeholder="Email"
          prefix={
            <UserOutlined style={{ color: "#1890ff" }} className="mr-2" />
          }
          className="my-3 h-10"
        ></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!!" }]}
      >
        <Input.Password
          placeholder="Password"
          prefix={
            <LockOutlined style={{ color: "#1890ff" }} className="mr-2" />
          }
          className="my-3 h-10"
        ></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" className="w-full my-3 h-10" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}