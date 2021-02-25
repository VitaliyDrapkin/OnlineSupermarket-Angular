import { Component, Input, OnInit } from '@angular/core';
import { product } from 'src/app/models/productsResponse';
import { CartLogicService } from 'src/app/services/cart-logic.service';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css'],
})
export class AddProductModalComponent implements OnInit {
  @Input() product: product;
  @Input() cancel;
  amount = 1;
  constructor(private cartLogic: CartLogicService) {}

  ngOnInit(): void {}

  addProductToCart() {
    this.cartLogic.addProductToCart(
      this.product.id,
      this.amount,
      this.product.name,
      this.product.price,
      this.product.image
    );
    this.cancel();
  }
}
