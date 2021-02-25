import { NotificationsService } from './notifications.service';
import { ResetService } from './reset.service';
import { AuthDataService } from 'src/app/services/auth-data.service';
import { LoginLogicService } from './login-logic.service';
import { PurchaseRequestsService } from './purchase-requests.service';
import { RegisterLogicService } from 'src/app/services/register-logic.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CartLogicService } from './cart-logic.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseLogicService {
  searchValue = '';
  form: FormGroup;
  isModalWindowOpen = false;
  receipt = '';

  constructor(
    private purchaseRequests: PurchaseRequestsService,
    private cartLogic: CartLogicService,
    private reset: ResetService,
    private authData: AuthDataService,
    private toast: NotificationsService
  ) {}

  initForm() {
    this.form = new FormGroup({
      city: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      creditCard: new FormControl('', Validators.required),
    });
  }

  autoCompleteCity() {
    this.form.controls.city.setValue(this.authData.city);
  }
  autoCompleteStreet() {
    this.form.controls.street.setValue(this.authData.street);
  }

  makePurchase() {
    const isCreditCardValid = this.creditCardValidation();
    if (!isCreditCardValid) {
      this.form.controls.creditCard.setErrors({ incorrect: true });
      return;
    }

    this.purchaseRequests
      .makePurchase(
        this.form.controls.city.value,
        this.form.controls.street.value,
        this.form.controls.date.value,
        this.form.controls.creditCard.value.slice(
          this.form.controls.creditCard.value.length - 4
        )
      )
      .subscribe(
        () => {
          this.makeReceipt();
          this.cartLogic.cartItems = [];
          this.isModalWindowOpen = true;
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

  creditCardValidation() {
    if (!Number.isInteger(+this.form.controls.creditCard.value)) {
      return false;
    }
    if (this.form.controls.creditCard.value.trim().length !== 16) {
      return false;
    }
    return true;
  }

  makeReceipt() {
    this.receipt = 'B-Online\n***********\n';
    this.receipt =
      this.receipt + 'Purchase date : ' + this.getPurchaseDate() + '\n';
    this.receipt = this.receipt + '***********\n';
    this.receipt = this.receipt + 'Products : \n';
    this.addProductInfoToReceipt();
    this.receipt = this.receipt + '***********\n';
    this.receipt =
      this.receipt +
      'Total receipt price : ' +
      Math.floor(this.cartLogic.getTotalPrice() * 10) / 10 +
      '$\n';
    this.receipt = this.receipt + '***********\n\n';
    this.receipt =
      this.receipt +
      'Bank card : **** **** **** ' +
      this.form.controls.creditCard.value.slice(
        this.form.controls.creditCard.value.length - 4
      ) +
      '\n';
    this.receipt =
      this.receipt + 'Shipping date : ' + this.form.controls.date.value + '\n';
    this.receipt =
      this.receipt +
      'Shipping address : ' +
      this.form.controls.city.value +
      ' / ' +
      this.form.controls.street.value +
      '\n';
    this.receipt = this.receipt + '***********\n';
    this.receipt = this.receipt + 'Thanks for purchase!';
  }

  addProductInfoToReceipt() {
    for (let item of this.cartLogic.cartItems) {
      this.receipt =
        this.receipt +
        item.name +
        ' : ' +
        item.amount +
        'pcs' +
        '    Total price : ' +
        Math.floor(item.totalPrice * 10) / 10 +
        '$ \n';
    }
  }

  getPurchaseDate() {
    const now = new Date().toLocaleDateString();
    const dateArray = now.split('/');
    let newDate = dateArray[2] + '-';
    if (dateArray[0].length === 1) {
      newDate = newDate + 0;
    }
    newDate = newDate + dateArray[0] + '-';
    if (dateArray[1].length === 1) {
      newDate = newDate + 0;
    }
    newDate = newDate + dateArray[1];
    return newDate;
  }
}
