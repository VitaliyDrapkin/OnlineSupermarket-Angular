import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchaseRequestsService {
  constructor(private Http: HttpClient) {}

  makePurchase = (
    city: string,
    street: string,
    dateDelivery: Date,
    fourDigits: number
  ): Observable<{ status: string }> => {
    return this.Http.post<{ status: string }>(
      'http://localhost:3001/carts/purchase',
      { city, street, dateDelivery, fourDigits }
    );
  };
}
