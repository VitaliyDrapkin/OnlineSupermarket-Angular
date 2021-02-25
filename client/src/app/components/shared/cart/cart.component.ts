import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('cartWindow', [
      transition(':enter', [style({ width: '0' }), animate(250)]),
      transition(':leave', [
        style({ width: '100%' }),
        animate(
          250,
          style({
            width: '0',
          })
        ),
      ]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  constructor(public cartLogic: CartLogicService) {}

  ngOnInit(): void {}
}
