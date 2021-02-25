import { ProductsLogicService } from './../../services/products-logic.service';
import { CartLogicService } from './../../services/cart-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  constructor(
    public cartLogic: CartLogicService,
    public productLogic: ProductsLogicService
  ) {}

  ngOnInit(): void {}
}
