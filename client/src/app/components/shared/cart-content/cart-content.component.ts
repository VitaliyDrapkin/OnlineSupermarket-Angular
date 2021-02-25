import { Component, OnInit } from '@angular/core';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
})
export class CartContentComponent implements OnInit {
  constructor(public cartLogic: CartLogicService) {}

  ngOnInit(): void {
    this.cartLogic.getCartItems();
  }
}
