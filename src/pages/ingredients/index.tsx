import React from "react"
import {
  Table,
  InputNumber,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Pagination,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { UploadFile } from "../../interface/file/FileUpload"
import { Ingredient } from "../../interface/ingredient/Ingredient"
import { Upload as UploadAPI } from "../../api/file"
import {
  CreateIngredient,
  GetAllIngredient,
  UpdateIngredient,
} from "../../api/ingredients"
import Template from "../../components/template"
import { CreateRequest } from "../../interface/ingredient/Request"
import "./style.css"
import { useApi } from "../../context/api"
const { Column } = Table
interface Item {
  id: Number
  name: String
  total: Number
}

interface IngredientItem extends Ingredient {
  changedStock: number
}

export default () => {
  const [page, setPage] = React.useState(1)
  const [totalItem, setTotalItem] = React.useState(0)
  const [data, setData] = React.useState<IngredientItem[]>([])
  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [selectedIngredient, setSelectedIngredient] = React.useState(-1)
  const api = useApi()

  const Refresh = async () => {
    const response = await GetAllIngredient(api.apiClient, page)
    let ingredientItems: IngredientItem[] = []
    let ingredients = response.data.items
    ingredients.forEach((i) => {
      let j = i as IngredientItem
      j.changedStock = j.stock
      ingredientItems.push(j)
    })
    console.log(response)
    setData(ingredientItems)
    setTotalItem(response.data.totalItems)
  }
  React.useEffect(() => {
    Refresh()
  }, [page])
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
          width={2}
          title="Jumlah"
          dataIndex="changedStock"
          key="total"
          render={(total, _, i) => (
            <InputNumber
              key={i}
              value={total}
              min={0}
              onChange={(newTotal) => {
                let newData = [...data]
                newData[i].changedStock = newTotal
                setData([...newData])
              }}
            />
          )}
        ></Column>
        <Column
          width={10}
          title="Action"
          dataIndex="stock"
          key="stock"
          render={(_, record: IngredientItem, i) => {
            return (
              <Button
                type="primary"
                className="mx-auto mt-4"
                disabled={record.stock === record.changedStock}
                onClick={async () => {
                  try {
                    record.stock = record.changedStock
                    const response = await UpdateIngredient(
                      api.apiClient,
                      record
                    )
                    let newData = [...data]
                    newData[i].stock = record.changedStock
                    setData(newData)
                  } catch {}
                }}
              >
                Update
              </Button>
            )
          }}
        ></Column>
      </Table>
      <Pagination
        pageSize={10}
        current={page}
        total={totalItem}
        onChange={(page) => setPage(page)}
      />
      {isModalVisible && (
        <AddIngredientModal
          closeModal={() => {
            setIsModalVisible(false)
          }}
        />
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
  closeModal: () => void
}

const AddIngredientModal = (props: AddIngredientProps) => {
  const [file, setFile] = React.useState<UploadFile>()
  const [form] = Form.useForm()

  const api = useApi()
  const handleAddIngredient = async (val) => {
    const file = val.file.file
    try {
      const fileResponse = await UploadAPI(api.apiClient, file)
      val = val as CreateRequest
      val.picture = fileResponse.data.url
      const response = await CreateIngredient(api.apiClient, val)
      message.success("Bahan baku berhasil dibuat !!!")
      form.resetFields()
    } catch {
      message.error("Terjadi kesalahan. Silahkan coba beberapa saat lagi ")
    }
  }
  return (
    <Modal
      keyboard
      footer={[]}
      onCancel={() => props.closeModal()}
      visible={true}
    >
      <Form className="py-8" onFinish={handleAddIngredient} form={form}>
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
          rules={[{ required: true, message: "Description required" }]}
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
          name="file"
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