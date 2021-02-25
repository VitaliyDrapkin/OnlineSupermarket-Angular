import { NotificationsService } from './notifications.service';
import { ResetService } from './reset.service';
import { ProductsLogicService } from 'src/app/services/products-logic.service';
import { ShopInfoServiceLogic } from './shop-info-logic.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthDataService } from './auth-data.service';
import { UsersRequestsService } from './users-requests.service';
import { Router } from '@angular/router';
import { CartLogicService } from './cart-logic.service';

@Injectable({
  providedIn: 'root',
})
export class LoginLogicService {
  form: FormGroup;
  resetSubscribesDataFunctions = [];
  constructor(
    private usersRequests: UsersRequestsService,
    private authData: AuthDataService,
    private router: Router,
    private reset: ResetService,
    private toast: NotificationsService
  ) {}

  initForm() {
    this.form = new FormGroup({
      id: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (
      this.form.controls.id.value.length !== 9 ||
      !Number.isInteger(+this.form.controls.id.value)
    ) {
      this.form.controls.id.setErrors({ incorrect: true });
      return;
    }
    this.usersRequests
      .login(this.form.controls.id.value, this.form.controls.password.value)
      .subscribe(
        (data) => {
          this.authData.setAuthData(data);
          if (data.userData.userType === 'admin') {
            this.router.navigate(['/main']);
          }
          this.authData.loginModalWindow = true;
        },
        (err) => {
          if (err.status == 401) {
            this.form.controls.password.setValue('');
            this.form.controls.password.setErrors({ unauthorized: true });
          } else {
            this.toast.showError('Please try later', 'Server error');
          }
        }
      );
  }

  autoLogin() {
    if (!this.authData.getToken()) {
      return;
    }
    this.usersRequests.autoLogin().subscribe(
      (data) => {
        this.authData.setAuthData(data);
        this.router.navigate(['/main']);
      },
      (err) => {
        if (err.status == 401) {
          this.authData.removeToken();
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  logout() {
    this.reset.reset();
  }
}
