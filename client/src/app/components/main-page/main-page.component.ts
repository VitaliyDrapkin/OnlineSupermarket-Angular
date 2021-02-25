import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProductsLogicService } from './../../services/products-logic.service';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [
    trigger('cartOpen', [
      state('false', style({ marginLeft: '0' })),
      state('true', style({ marginLeft: '22.4rem' })),
      transition('* => *', animate(250)),
    ]),
  ],
})
export class MainPageComponent implements OnInit {
  constructor(
    public cartLogic: CartLogicService,
    public productLogic: ProductsLogicService
  ) {}

  ngOnInit(): void {}
}
