import { cartItemsResponse } from './../models/cartItemsResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { lastCartInfoResponse } from '../models/cartResponse';

@Injectable({
  providedIn: 'root',
})
export class CartsRequestsService {
  constructor(private Http: HttpClient) {}

  initLastCartInfo = (): Observable<lastCartInfoResponse> => {
    return this.Http.get<lastCartInfoResponse>(
      'http://localhost:3001/carts/info',
      {}
    );
  };

  openNewCart = (): Observable<{ status: string }> => {
    return this.Http.delete<{ status: string }>(
      'http://localhost:3001/carts/',
      {}
    );
  };

  getCartItems = (): Observable<cartItemsResponse> => {
    return this.Http.get<cartItemsResponse>('http://localhost:3001/carts');
  };

  changeAmountOfProducts = (
    cartItemId: number,
    changeMethod: 'increase' | 'decrease'
  ): Observable<{ status: string }> => {
    return this.Http.put<{ status: string }>(
      `http://localhost:3001/carts/cartitem/${cartItemId}`,
      {
        changeType: changeMethod,
      }
    );
  };

  addProductToCart = (
    productId: number,
    amount: number
  ): Observable<{ cartItemId: number }> => {
    return this.Http.post<{ cartItemId: number }>(
      `http://localhost:3001/carts/cartitem/`,
      {
        productId,
        amount,
      }
    );
  };

  removeProductFromCart = (
    cartItemId: number
  ): Observable<{ status: string }> => {
    return this.Http.delete<{ status: string }>(
      `http://localhost:3001/carts/cartitem/${cartItemId}`
    );
  };

  removeAllCartItems = (): Observable<{ status: string }> => {
    return this.Http.delete<{ status: string }>(`http://localhost:3001/carts/`);
  };
}
