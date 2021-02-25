import { AuthDataService } from 'src/app/services/auth-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  constructor(
    public cartLogic: CartLogicService,
    private Router: Router,
    private authData: AuthDataService
  ) {}

  ngOnInit(): void {
    this.cartLogic.initLastActions();
  }

  goToShop() {
    this.authData.loginModalWindow = false;
    this.Router.navigate(['main']);
  }

  openNewCart() {
    this.cartLogic.openNewCart();
    this.authData.loginModalWindow = false;
    this.Router.navigate(['main']);
  }
}
