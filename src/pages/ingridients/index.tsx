import React from "react"
import { Table, InputNumber, Button } from "antd"
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
  return (
    <Template title="Bahan Baku">
      <div className="w-full max-w-6xl mx-auto px-3 flex flex-col items-center">
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
    </Template>
  )
}
