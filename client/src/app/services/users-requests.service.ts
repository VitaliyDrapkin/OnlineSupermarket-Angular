import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  checkFirstFieldsResponseType,
  loginResponse,
  shopInfoResponse,
} from '../models/authResponses';

@Injectable({
  providedIn: 'root',
})
export class UsersRequestsService {
  constructor(private Http: HttpClient) {}

  checkFirstFields = (
    id: number,
    email: string,
    password: string
  ): Observable<checkFirstFieldsResponseType> => {
    return this.Http.post<checkFirstFieldsResponseType>(
      'http://localhost:3001/users/check',
      {
        id,
        password,
        email,
      }
    );
  };

  register = (
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    city: string,
    street: string
  ): Observable<loginResponse> => {
    return this.Http.post<loginResponse>(
      'http://localhost:3001/users/registration',
      {
        id,
        password,
        email,
        firstName,
        lastName,
        city,
        street,
      }
    );
  };

  login = (id: number, password: string): Observable<loginResponse> => {
    return this.Http.post<loginResponse>('http://localhost:3001/users/login', {
      id,
      password,
    });
  };

  initShopInfo = (): Observable<shopInfoResponse> => {
    return this.Http.get<shopInfoResponse>(
      'http://localhost:3001/users/info',
      {}
    );
  };

  autoLogin = (): Observable<any> => {
    return this.Http.get<any>('http://localhost:3001/users/login');
  };
}
