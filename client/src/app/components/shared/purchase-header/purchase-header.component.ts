import { AuthDataService } from 'src/app/services/auth-data.service';
import { LoginLogicService } from './../../../services/login-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-header',
  templateUrl: './purchase-header.component.html',
  styleUrls: ['./purchase-header.component.css'],
})
export class PurchaseHeaderComponent implements OnInit {
  constructor(
    public loginLogic: LoginLogicService,
    public authData: AuthDataService
  ) {}

  ngOnInit(): void {}
}
