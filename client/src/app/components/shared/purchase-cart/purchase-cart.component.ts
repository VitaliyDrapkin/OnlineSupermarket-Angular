import { PurchaseLogicService } from './../../../services/purchase-logic.service';
import { Component, OnInit } from '@angular/core';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-purchase-cart',
  templateUrl: './purchase-cart.component.html',
  styleUrls: ['./purchase-cart.component.css'],
})
export class PurchaseCartComponent implements OnInit {
  constructor(
    public purchaseLogic: PurchaseLogicService,
    public cartLogic: CartLogicService
  ) {}

  ngOnInit(): void {}
}
