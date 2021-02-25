import { NotificationsService } from './notifications.service';
import { LoginLogicService } from './login-logic.service';
import { Injectable } from '@angular/core';
import { AuthDataService } from './auth-data.service';
import { UsersRequestsService } from './users-requests.service';

@Injectable({
  providedIn: 'root',
})
export class ShopInfoServiceLogic {
  //Shop info
  isShopInfoInit = false;
  productsAmount = 0;
  ordersSubmitted = 0;

  constructor(
    private usersRequests: UsersRequestsService,
    private toast: NotificationsService
  ) {}

  initShopInfo() {
    if (this.isShopInfoInit) {
      return;
    }

    this.usersRequests.initShopInfo().subscribe(
      (data) => {
        this.productsAmount = data.shopInfo.productsAmount;
        this.ordersSubmitted = data.shopInfo.ordersSubmitted;
        this.isShopInfoInit = true;
      },
      (err) => {
        this.toast.showError('Please try later', 'Server error');
      }
    );
  }

  resetShopInfo() {
    this.isShopInfoInit = false;
    this.productsAmount = 0;
    this.ordersSubmitted = 0;
  }
}
