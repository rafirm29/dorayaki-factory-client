import React, { useState } from 'react';
import {
  Table,
  Select,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Form,
  Typography,
} from 'antd';
import Template from '../../components/template';
import { Ingredient } from '../../interface/ingredient/Ingredient';

const { Option } = Select;

// Dummy datas
const dummyIngredient: Ingredient[] = [];
const dummyBahan: string[] = ['Gula', 'Tepung', 'Telur'];

const inputBahan = (
  <Select>
    {dummyBahan.map((ingredient) => {
      return <Option value={ingredient}>{ingredient}</Option>;
    })}
  </Select>
);

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'ingredient';
  record: Ingredient;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : inputBahan;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const recipesadd = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(dummyIngredient);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Ingredient) => record.id.toString() === editingKey;

  const edit = (record: Partial<Ingredient> & { id: number }) => {
    form.setFieldsValue({ name: '', stock: 0, ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Ingredient;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        // Found
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        // Not found
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const add = () => {
    const newId = data.length + 1;
    const newData: Ingredient = {
      id: newId,
      name: 'Gula',
      stock: 0,
    };
    setData([...data, newData]);
  };

  const columns = [
    {
      title: 'Nama',
      dataIndex: 'name',
      width: '50%',
      editable: true,
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      width: '25%',
      editable: true,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      render: (_: any, record: Ingredient) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Ingredient) => ({
        record,
        inputType: col.dataIndex === 'stock' ? 'number' : 'ingredient',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Template title="Tambah Resep">
      <Form form={form} component={false}>
        <Form.Item label="Nama" className="w-3/4">
          <Input placeholder="Nama resep" />
        </Form.Item>
        <Form.Item label="Bahan" className="w-3/4">
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            footer={() => {
              return (
                <div className="flex justify-center items-center">
                  <Button onClick={add} className="w-full font-bold">
                    + Add
                  </Button>
                </div>
              );
            }}
            className="w-full"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </Template>
  );
};

export default recipesadd;
