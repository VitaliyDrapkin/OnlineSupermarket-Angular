import { Observable } from 'rxjs';
import { productsResponse } from './../models/productsResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsRequestsService {
  constructor(private Http: HttpClient) {}

  getProducts(
    searchBy: string,
    value: number | string
  ): Observable<productsResponse> {
    return this.Http.get<productsResponse>(
      `http://localhost:3001/products?search=${searchBy}&value=${value}`
    );
  }

  addProduct(
    name: string,
    categoryId: number,
    price: number,
    image: string
  ): Observable<{ status: string; productId: number }> {
    return this.Http.post<{ status: string; productId: number }>(
      `http://localhost:3001/products`,
      {
        name,
        categoryId,
        price,
        image,
      }
    );
  }

  editProduct(
    productId: number,
    name: string,
    categoryId: number,
    price: number,
    image?: string
  ): Observable<{ status: string }> {
    return this.Http.put<{ status: string }>(
      `http://localhost:3001/products/${productId}`,
      {
        name,
        categoryId,
        price,
        image,
      }
    );
  }

  addProductImage(formData: FormData): Observable<{ imgUrl: string }> {
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let options = { headers: headers };

    return this.Http.post<{ imgUrl: string }>(
      'http://localhost:3001/files/upload',
      formData
    );
  }
}
