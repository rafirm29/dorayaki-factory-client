import { AxiosInstance } from 'axios';
import { CreateRequest, UpdateRequest } from '../interface/ingredient/Request';
import { GetAllResponseMinified } from '../interface/ingredient/Response';
import {
  Ingredient,
  IngredientMinified,
} from '../interface/ingredient/Ingredient';
import { BasePaginationResponse, BaseResponse } from '../interface/Base';

export const CreateIngredient = (
  axios: AxiosInstance,
  payload: CreateRequest
): Promise<Ingredient> => {
  return axios
    .post('/api/ingredient/', payload)
    .then((response) => response.data as Ingredient);
};

export const GetAllIngredient = (
  axios: AxiosInstance,
  page: number
): Promise<BasePaginationResponse<Ingredient>> => {
  return axios
    .get('/api/ingredient', {
      params: {
        page,
      },
    })
    .then((response) => response.data as BasePaginationResponse<Ingredient>);
};

export const UpdateIngredient = (
  axios: AxiosInstance,
  payload: UpdateRequest
): Promise<BaseResponse> => {
  return axios
    .put('/api/ingredient/', payload)
    .then((response) => response.data as BaseResponse);
};

export const GetAllIngredientMinified = (
  axios: AxiosInstance
): Promise<GetAllResponseMinified> => {
  return axios
    .get('/api/ingredient/minified')
    .then((response) => response.data as GetAllResponseMinified);
};
