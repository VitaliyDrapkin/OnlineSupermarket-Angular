import { CartLogicService } from 'src/app/services/cart-logic.service';
import { RegisterLogicService } from 'src/app/services/register-logic.service';
import { PurchaseLogicService } from './../../../services/purchase-logic.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  minDate: string;
  maxDate: string;
  constructor(
    public purchaseLogic: PurchaseLogicService,
    public cartLogic: CartLogicService,
    public registerLogic: RegisterLogicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.minDate = new Date().toISOString().slice(0, 10);
    this.maxDate = new Date('2025-12-31').toISOString().slice(0, 10);

    this.purchaseLogic.initForm();
  }

  backToShop() {
    this.cartLogic.isPurchasePageOpen = false;
    this.router.navigate(['/main']);
  }
}
