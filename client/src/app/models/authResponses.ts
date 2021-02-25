export interface loginResponse {
  userData: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    street: string;
    userType: string;
  };
  token: string;
}

export interface checkFirstFieldsResponseType {
  isGood: boolean;
  id: { isGood: boolean; message: string };
  email: { isGood: boolean; message: string };
  password: { isGood: boolean; message: string };
}

export interface shopInfoResponse {
  shopInfo: {
    productsAmount: number;
    ordersSubmitted: number;
  };
}
