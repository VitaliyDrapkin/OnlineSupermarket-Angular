import { AuthDataService } from 'src/app/services/auth-data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResetService {
  constructor(private authData: AuthDataService, private router: Router) {}

  reset() {
    this.authData.removeToken();
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
