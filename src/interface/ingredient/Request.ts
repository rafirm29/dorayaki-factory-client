export interface CreateRequest {
  name: string
  description: string
  picture: string
  stock: number
}

export interface UpdateRequest extends CreateRequest {
  id: number
}
