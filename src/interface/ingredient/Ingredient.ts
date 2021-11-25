export interface Ingredient {
  id: number;
  name: string;
  description: string;
  picture: string;
  stock: number;
}

export interface IngredientMinified {
  id: number;
  name: string;
}
