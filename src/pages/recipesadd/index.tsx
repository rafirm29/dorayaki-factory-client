import React, { useEffect, useState } from 'react';
import {
  Table,
  Select,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Form,
  Typography,
  message,
} from 'antd';
import Template from '../../components/template';
import {
  Ingredient,
  IngredientMinified,
} from '../../interface/ingredient/Ingredient';
import { GetAllIngredientMinified } from '../../api/ingredients';
import { useApi } from '../../context/api';
import { CreateRecipe } from '../../api/recipes';

const { Option } = Select;

interface IngredientItem {
  id: number;
  name: string;
  stock: number;
}

// Dummy datas

const InputBahan = (listBahan: IngredientMinified[]) => {
  return (
    <Select>
      {listBahan.map((ingredient) => {
        return (
          <Option value={(ingredient.id, ingredient.name)}>
            {ingredient.name}
          </Option>
        );
      })}
    </Select>
  );
};

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'ingredient';
  record: Ingredient;
  index: number;
  children: React.ReactNode;
}

const recipesadd = () => {
  const api = useApi();
  const [form] = Form.useForm();
  const [data, setData] = useState([] as IngredientItem[]);
  const [availableIngredients, setAvailableIngredients] = useState(
    [] as IngredientMinified[]
  );
  const [editingKey, setEditingKey] = useState('');
  const Refresh = async () => {
    const response = await GetAllIngredientMinified(api.apiClient)
    setAvailableIngredients(response.data);
  };
  useEffect(() => {
    Refresh();
  }, []);

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
    const inputNode =
      inputType === 'number' ? (
        <InputNumber />
      ) : (
        InputBahan(availableIngredients)
      );

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

  const isEditing = (record: IngredientItem) =>
    record.id.toString() === editingKey;

  const edit = (record: Partial<IngredientItem> & { id: number }) => {
    form.setFieldsValue({ name: '', stock: 0, ...record });
    setEditingKey(record.id.toString());
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IngredientItem;

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
    const newData: IngredientItem = {
      id: newId,
      name: '',
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
      render: (_: any, record: IngredientItem) => {
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
      onCell: (record: IngredientItem) => ({
        record,
        inputType: col.dataIndex === 'stock' ? 'number' : 'ingredient',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const findIdByName = (item: IngredientItem) => {
    let id = availableIngredients.filter(
      (ingredient) => item.name === ingredient.name
    )[0].id;
    return id;
  };

  const handleSubmit = async (resp: any) => {
    const recipes: any = [];
    data.forEach((item) => {
      const id = findIdByName(item);
      const amount = item.stock;
      recipes.push({ id: id, amount: amount });
    });

    const payload = {
      name: `${resp.recipeName}`,
      description: `${resp.description}`,
      picture: 'https://joeschmoe.io/api/v1/random',
      recipes: recipes,
    };
    console.log(payload);
    try {
      const response = await CreateRecipe(api.apiClient, payload);
      console.log(response);
      message.success('Berhasil dibuat');
    } catch {
      message.success('Terjadi kesalahan');
    }
  };

  return (
    <Template title="Tambah Resep">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="w-3/4"
      >
        <Form.Item name="recipeName" label="Nama" className="w-full">
          <Input placeholder="Nama resep" />
        </Form.Item>
        <Form.Item name="description" label="Deskripsi" className="w-full">
          <Input.TextArea placeholder="Deskripsi" />
        </Form.Item>
        <Form.Item name="table" label="Bahan" className="w-full">
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Template>
  );
};

export default recipesadd;
