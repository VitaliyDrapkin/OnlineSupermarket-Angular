import { NotificationsService } from './notifications.service';
import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginResponse } from '../models/authResponses';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  isInit = false;
  isLogin = false;
  id = 0;
  firstName = '';
  lastName = '';
  email = '';
  city = '';
  street = '';
  userType = 'user';

  loginModalWindow = false;

  constructor(private router: Router, private toast: NotificationsService) {}

  setAuthData(obj: loginResponse) {
    this.isInit = true;
    this.isLogin = true;
    this.id = obj.userData.id;
    this.firstName = obj.userData.firstName;
    this.lastName = obj.userData.lastName;
    this.email = obj.userData.email;
    this.city = obj.userData.city;
    this.street = obj.userData.street;
    this.userType = obj.userData.userType;
    if (obj.token) {
      this.setToken(obj.token);
    }
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem(
      'tokenTime',
      1000 * 60 * 115 + new Date().getTime() + '' //115 min token
    );
  }

  getToken() {
    const time = new Date().getTime();
    if (
      sessionStorage.getItem('token') &&
      time > +sessionStorage.getItem('tokenTime')
    ) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenTime');
      this.toast.showInfo('Please login again', 'The session is over');

      this.router.navigate(['/login']);
      return;
    }
    return sessionStorage.getItem('token');
  }

  removeToken() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenTime');
  }

  reset() {
    this.isInit = false;
    this.isLogin = false;
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.city = '';
    this.street = '';
    this.userType = 'user';
    this.loginModalWindow = false;
  }
}
