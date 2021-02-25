export interface cartItem {
  id: number;
  amount: number;
  totalPrice: number;
  name: string;
  image: string;
}

export interface cartItemsResponse {
  productsInCart: cartItem[];
}
