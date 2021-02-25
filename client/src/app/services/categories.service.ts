import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { categoriesResponse } from '../models/categoriesResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private Http: HttpClient) {}

  initCategories(): Observable<categoriesResponse> {
    return this.Http.get<categoriesResponse>(
      'http://localhost:3001/categories/'
    );
  }
}
