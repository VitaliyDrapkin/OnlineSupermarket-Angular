import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthDataService } from '../services/auth-data.service';

@Injectable({
  providedIn: 'root',
})
export class NoAdminGuard implements CanActivate {
  constructor(private authData: AuthDataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authData.userType === 'admin') {
      return true;
    } else {
      this.router.navigate(['/main']);
    }
  }
}
