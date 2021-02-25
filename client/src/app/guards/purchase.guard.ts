import { CartLogicService } from 'src/app/services/cart-logic.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseGuard implements CanActivate {
  constructor(private cartLogic: CartLogicService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.cartLogic.isPurchasePageOpen === true) {
      return true;
    } else {
      this.router.navigate(['/main']);
    }
  }
}
