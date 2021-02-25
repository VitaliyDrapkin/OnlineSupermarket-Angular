import { ShopInfoServiceLogic } from './../../../services/shop-info-logic.service';
import { Component, OnInit } from '@angular/core';
import { AuthDataService } from 'src/app/services/auth-data.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css'],
})
export class ShopInfoComponent implements OnInit {
  constructor(public shopLogic: ShopInfoServiceLogic) {}

  ngOnInit(): void {
    this.shopLogic.initShopInfo();
  }
}
