interface CreateRequestRecipe {
  id: number;
  amount: number;
}

export interface CreateRequest {
  name: string;
  description: string;
  picture: string;
  recipes: CreateRequestRecipe[];
}
