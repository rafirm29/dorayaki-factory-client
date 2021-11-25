import React from 'react';
import Template from '../../components/template';
import { Recipe } from '../../interface/recipe/Recipe';
import { Table } from 'antd';

const { Column } = Table;

const dummyRecipes: Recipe[] = [
  {
    id: 0,
    name: 'Doracoklat',
    ingredients: [
      { id: 1, name: 'Name 1', stock: 5 },
      { id: 2, name: 'Name 2', stock: 3 },
    ],
  },
  {
    id: 1,
    name: 'Doravanilla',
    ingredients: [
      { id: 1, name: 'Name 1', stock: 5 },
      { id: 2, name: 'Name 2', stock: 3 },
    ],
  },
  {
    id: 2,
    name: 'Dorastroberi',
    ingredients: [
      { id: 1, name: 'Name 1', stock: 5 },
      { id: 2, name: 'Name 2', stock: 3 },
    ],
  },
];

const renderTable = (recipe: Recipe) => {
  return (
    <React.Fragment>
      <h2>{recipe.name}</h2>
      <Table dataSource={recipe.ingredients}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="Bahan Baku" dataIndex="name" key="name" />
        <Column title="Jumlah" dataIndex="stock" key="stock" />
      </Table>
    </React.Fragment>
  );
};

const recipes = () => {
  const renderRecipes = dummyRecipes.map((recipe) => {
    return renderTable(recipe);
  });
  return <Template title="Daftar Resep">{renderRecipes}</Template>;
};

export default recipes;
