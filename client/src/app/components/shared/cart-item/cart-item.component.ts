import { cartItem } from './../../../models/cartItemsResponse';
import { Component, Input, OnInit } from '@angular/core';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: cartItem;
  isChangeAmountMode = false;
  changeDisabled = false;

  constructor(public cartLogic: CartLogicService) {}

  ngOnInit(): void {}
}
