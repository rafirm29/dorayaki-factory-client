import React from "react"
import { Table, InputNumber, Button, Modal, Form, Input } from "antd"
import Template from "../../components/template"
import "./style.css"
const { Column } = Table
interface Item {
  id: Number
  name: String
  total: Number
}
export default () => {
  const dummyItems: Item[] = [
    {
      id: 1,
      name: "Name 1",
      total: 2,
    },
    {
      id: 2,
      name: "Name 2",
      total: 3,
    },
  ]
  const [data, setData] = React.useState<Item[]>(dummyItems)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  return (
    <Template title="Bahan Baku">
      <div className="w-full max-w-6xl mx-auto px-3 flex flex-col items-center">
        <Button
          className="self-end mb-3"
          onClick={() => setIsModalVisible(true)}
        >
          +
        </Button>
        <Table
          dataSource={data}
          rowKey="id"
          pagination={false}
          rowClassName="bg-transparent"
          className="w-full"
        >
          <Column title="Nama" dataIndex="name" key="name"></Column>
          <Column
            width={1}
            title="Jumlah"
            dataIndex="total"
            key="total"
            render={(total, _, i) => (
              <InputNumber
                key={i}
                value={total}
                onChange={(newTotal) => {
                  let newData = [...data]
                  newData[i].total = newTotal
                  setData([...newData])
                }}
              />
            )}
          ></Column>
        </Table>
        <Button type="primary" className="mx-auto mt-4">
          Update
        </Button>
      </div>
      <Modal
        visible={isModalVisible}
        keyboard
        footer={[]}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form className="py-8">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Ingredients name required" }]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 20 }}
            label="Name"
          >
            <Input placeholder="Name"></Input>
          </Form.Item>
          <Form.Item
            name="initialStock"
            rules={[{ required: true, message: "Intial stock required" }]}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 20 }}
            label="Initial Stock"
          >
            <InputNumber className="w-full" min={0}></InputNumber>
          </Form.Item>
          <Button
            type="primary"
            className="my-3 h-10 float-right"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </Template>
  )
}
