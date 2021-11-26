import React from 'react';
import Template from '../../components/template';
import { Recipe } from '../../interface/recipe/Recipe';
import { Pagination, Table } from 'antd';
import ingredients from '../ingredients';
import { useApi } from '../../context/api';
import { GetAllRecipe } from '../../api/recipes';

const { Column } = Table;

const dummyRecipes: Recipe[] = [
    {
        dorayaki: {
            id: 0,
            name: 'Doracoklat',
            description: 'enak',
            picture: 'img',
        },
        ingredients: [
            {
                id: 0,
                name: 'Gula',
                description: 'll',
                picture: 'img',
                stock: 5,
            },
            {
                id: 1,
                name: 'Tepung',
                description: 'll',
                picture: 'img',
                stock: 3,
            },
        ],
    },
    {
        dorayaki: {
            id: 1,
            name: 'Vanilla',
            description: 'nice',
            picture: 'img',
        },
        ingredients: [
            {
                id: 1,
                name: 'Tepung',
                description: 'll',
                picture: 'img',
                stock: 5,
            },
            {
                id: 2,
                name: 'Telur',
                description: 'll',
                picture: 'img',
                stock: 7,
            },
        ],
    },
];

const renderTable = (recipe: any) => {
    return (
        <div className="text-left w-3/4">
            <p className="text-2xl mt-8 mb-4">{recipe.name}</p>
            <Table dataSource={recipe.recipes} pagination={false} className="w-full">
                <Column title="Bahan Baku" dataIndex="name" key="name" />
                <Column title="Jumlah" dataIndex="amount" key="stock" />
            </Table>
        </div>
    );
};

const recipeslist = () => {
    const [page, setPage] = React.useState(1);
    const [totalItem, setTotalItem] = React.useState(0);
    const [data, setData] = React.useState<Recipe[]>([]);
    const api = useApi();

    const Refresh = async () => {
        const response = await GetAllRecipe(api.apiClient, page);
        console.log(response);
        setData(response.data.items);
        setTotalItem(response.data.totalItems);
    };
    React.useEffect(() => {
        Refresh();
    }, [page]);
    const renderRecipes = data.map((recipe) => {
        console.log('Recipe:');
        console.log(recipe);
        return renderTable(recipe);
    });
    return (
        <Template title="Daftar Resep">
            {renderRecipes}
            <Pagination
                pageSize={10}
                current={page}
                total={totalItem}
                onChange={(page) => setPage(page)}
            />
        </Template>
    );
};

export default recipeslist;
