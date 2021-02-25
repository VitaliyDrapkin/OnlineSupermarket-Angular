import { AuthDataService } from './../services/auth-data.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const urlExceptions = [
  'http://localhost:3001/users/registration',
  'http://localhost:3001/users/login',
  'http://localhost:3001/users/check',
  'http://localhost:3001/users/info',
];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authData: AuthDataService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url === 'http://localhost:3001/users/login' &&
      request.method === 'GET'
    ) {
      const cloned = request.clone({
        headers: request.headers.append(
          'authorization',
          this.authData.getToken()
        ),
      });
      return next.handle(cloned);
    }
    if (urlExceptions.includes(request.url)) {
      return next.handle(request);
    }
    const cloned = request.clone({
      headers: request.headers.append(
        'authorization',
        this.authData.getToken()
      ),
    });
    return next.handle(cloned);
  }
}
