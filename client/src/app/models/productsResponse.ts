export interface product {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  image: string;
}

export interface productsResponse {
  products: product[];
}
