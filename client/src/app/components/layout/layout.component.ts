import { LoginLogicService } from './../../services/login-logic.service';
import { AuthDataService } from 'src/app/services/auth-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private loginLogic: LoginLogicService) {}

  ngOnInit(): void {
    this.loginLogic.autoLogin();
  }
}
