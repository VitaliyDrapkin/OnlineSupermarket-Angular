import { NotificationsService } from './notifications.service';
import { ResetService } from './reset.service';
import { LoginLogicService } from './login-logic.service';
import { cartItem } from './../models/cartItemsResponse';
import { CartsRequestsService } from './carts-requests.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartLogicService {
  isLastActionsInit = false;

  isCartExist = false;
  cartId = 0;
  isCartFill = false;
  cartCreateDate: Date;
  cartTotalPrice = 0;

  isLastPurchaseExist = false;
  lastPurchaseTotalPrice = 0;
  lastPurchaseDate: Date;

  isCartWindowOpen = true;
  cartWindowWidth = 0;

  isCartItemsInit = false;
  cartItems: cartItem[] = [];

  isPurchasePageOpen = false;
  constructor(
    private cartsRequests: CartsRequestsService,
    private loginLogic: LoginLogicService,
    private reset: ResetService,
    private toast: NotificationsService
  ) {}

  initLastActions() {
    if (this.isLastActionsInit) {
      return;
    }

    this.cartsRequests.initLastCartInfo().subscribe(
      (data) => {
        this.isLastActionsInit = true;
        this.isCartExist = data.lastCartInfo.isExist;
        this.cartId = data.lastCartInfo.id;
        this.isCartFill = data.lastCartInfo.isFill;
        this.cartCreateDate = data.lastCartInfo.createDate;
        this.cartTotalPrice = data.lastCartInfo.totalPrice;
        this.isLastPurchaseExist = data.lastPurchaseInfo.isExist;
        this.lastPurchaseTotalPrice = data.lastPurchaseInfo.totalPrice;
        this.lastPurchaseDate = data.lastPurchaseInfo.datePurchase;
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  openNewCart() {
    this.cartsRequests.openNewCart().subscribe(
      () => {
        this.isCartFill = false;
        this.cartCreateDate = new Date();
        this.cartTotalPrice = 0;
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  cartWindowSwitch() {
    this.isCartWindowOpen = !this.isCartWindowOpen;
  }

  getCartItems() {
    if (this.isCartItemsInit) {
      return;
    }
    this.cartsRequests.getCartItems().subscribe(
      (data) => {
        this.cartItems = data.productsInCart;
        this.isCartItemsInit = true;
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    this.cartItems.forEach((item) => {
      totalPrice = totalPrice + item.totalPrice;
    });
    return totalPrice;
  }

  increaseAmountOfProduct(cartItemId) {
    this.cartsRequests.changeAmountOfProducts(cartItemId, 'increase').subscribe(
      () => {
        this.cartItems = this.cartItems.map((item) => {
          if (item.id == cartItemId) {
            item.amount++;
            item.totalPrice =
              (item.totalPrice / (item.amount - 1)) * item.amount;
          }
          return item;
        });
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  decreaseAmountOfProduct(cartItemId) {
    this.cartsRequests.changeAmountOfProducts(cartItemId, 'decrease').subscribe(
      () => {
        this.cartItems = this.cartItems.map((item) => {
          if (item.id == cartItemId) {
            item.amount--;
            item.totalPrice =
              (item.totalPrice / (item.amount + 1)) * item.amount;
          }
          return item;
        });
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  addProductToCart(
    productId: number,
    amount: number,
    name: string,
    price: number,
    image: string
  ) {
    this.cartsRequests.addProductToCart(productId, amount).subscribe(
      (data) => {
        const newCartItem: cartItem = {
          id: data.cartItemId,
          name: name,
          amount: amount,
          totalPrice: amount * price,
          image: image,
        };
        this.cartItems.push(newCartItem);
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  removeCartItemFromCart(cartItemId: number) {
    this.cartsRequests.removeProductFromCart(cartItemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter(
          (item) => item.id !== cartItemId
        );
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  removeAllCartItems() {
    this.cartsRequests.removeAllCartItems().subscribe(
      () => {
        this.cartItems = [];
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }
}
