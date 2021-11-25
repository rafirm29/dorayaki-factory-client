import { Ingredient } from '../ingredient/Ingredient';
export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
}
