import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-cart-nav',
  templateUrl: './cart-nav.component.html',
  styleUrls: ['./cart-nav.component.css'],
})
export class CartNavComponent implements OnInit {
  constructor(public cartLogic: CartLogicService, private router: Router) {}

  ngOnInit(): void {}

  goToPurchase() {
    this.cartLogic.isPurchasePageOpen = true;
    this.router.navigate(['/purchase']);
  }
}
