import { AxiosInstance } from 'axios';
import {} from '../interface/ingredient/Response';
import { Recipe } from '../interface/recipe/Recipe';
import { BasePaginationResponse, BaseResponse } from '../interface/Base';
import { CreateRequest } from '../interface/recipe/Request';

export const GetAllRecipe = (
  axios: AxiosInstance,
  page: number
): Promise<BasePaginationResponse<Recipe>> => {
  return axios
    .get('/api/dorayaki', {
      params: {
        page,
      },
    })
    .then((response) => response.data as BasePaginationResponse<Recipe>);
};

export const CreateRecipe = (
  axios: AxiosInstance,
  payload: CreateRequest
): Promise<Recipe> => {
  return axios
    .post('/api/dorayaki/', payload)
    .then((response) => response.data as Recipe);
};
