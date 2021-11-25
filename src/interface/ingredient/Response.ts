import { BaseResponse } from '../Base';
import { Ingredient, IngredientMinified } from './Ingredient';
export interface GetAllResponse {
  data: Ingredient[];
}
export interface GetAllResponseMinified {
  data: IngredientMinified[];
}
