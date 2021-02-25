import { cartItem } from './../models/cartItemsResponse';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'purchaseCartSearch',
})
export class PurchaseCartSearchPipe implements PipeTransform {
  transform(cartItems: cartItem[], value: string): cartItem[] {
    const newCartItems = cartItems.filter((item) =>
      item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    return newCartItems;
  }
}
