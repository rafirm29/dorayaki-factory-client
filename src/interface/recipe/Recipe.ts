import { Ingredient } from '../ingredient/Ingredient';
import { Dorayaki } from '../dorayaki/Dorayaki';
export interface Recipe {
  dorayaki: Dorayaki;
  ingredients: Ingredient[];
}
