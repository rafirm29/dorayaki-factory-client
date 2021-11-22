import React from "react"
import { Table, InputNumber, Button, Modal, Form, Input, Upload } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { UploadFile } from "../../interface/file/FileUpload"
import { Ingredient } from "../../interface/ingredient/Ingredient"
import Template from "../../components/template"
import "./style.css"
const { Column } = Table
interface Item {
  id: Number
  name: String
  total: Number
}

export default () => {
  const dummyItems: Ingredient[] = [
    {
      id: 1,
      name: "Name 1",
      stock: 2,
      description: "Dorayaki enak",
    },
    {
      id: 2,
      name: "Name 2",
      stock: 3,
    },
  ]
  const [data, setData] = React.useState<Ingredient[]>(dummyItems)
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [selectedIngredient, setSelectedIngredient] = React.useState(-1)

  return (
    <Template title="Bahan Baku">
      <Button className="self-end mb-3" onClick={() => setIsModalVisible(true)}>
        +
      </Button>
      <Table
        dataSource={data}
        rowKey="id"
        pagination={false}
        rowClassName="bg-transparent"
        className="w-full"
      >
        <Column
          title="Nama"
          dataIndex="name"
          key="name"
          onCell={(_, idx) => {
            return {
              onClick: () => {
                idx !== undefined && setSelectedIngredient(idx)
              },
            }
          }}
        ></Column>
        <Column
          width={1}
          title="Jumlah"
          dataIndex="stock"
          key="total"
          render={(total, _, i) => (
            <InputNumber
              key={i}
              value={total}
              min={0}
              onChange={(newTotal) => {
                let newData = [...data]
                newData[i].stock = newTotal
                setData([...newData])
              }}
            />
          )}
        ></Column>
      </Table>
      <Button type="primary" className="mx-auto mt-4">
        Update
      </Button>
      {isModalVisible && (
        <AddIngredientModal setIsModalVisible={setIsModalVisible} />
      )}
      {selectedIngredient !== -1 && (
        <DetailModal
          {...data[selectedIngredient]}
          closeModal={() => setSelectedIngredient(-1)}
        />
      )}
    </Template>
  )
}

interface DetailProps extends Ingredient {
  closeModal: () => void
}

const DetailModal = (props: DetailProps) => {
  console.log(props)
  return (
    <Modal
      keyboard
      footer={[]}
      onCancel={() => props.closeModal()}
      visible={true}
    >
      <div>
        <h2>{props.name}</h2>
        {props.picture && <img src={props.picture} />}
        <p>{props.description}</p>
      </div>
    </Modal>
  )
}

interface AddIngredientProps {
  setIsModalVisible: (isVisible: boolean) => void
}

const AddIngredientModal = (props: AddIngredientProps) => {
  const [file, setFile] = React.useState<UploadFile>()
  const handleAddIngredient = (val) => {
    console.log(val)
  }
  return (
    <Modal
      keyboard
      footer={[]}
      onCancel={() => props.setIsModalVisible(false)}
      visible={true}
    >
      <Form className="py-8" onFinish={handleAddIngredient}>
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
          name="description"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          label="Description"
        >
          <Input placeholder="Description"></Input>
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
        <Form.Item
          name="image"
          rules={[{ required: true, message: "Image required" }]}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
          label="Image"
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={(file) => setFile(file.file)}
            accept="image/*"
            fileList={file === undefined ? [] : [file]}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
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
  )
}