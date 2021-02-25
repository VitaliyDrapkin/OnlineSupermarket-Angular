import { LoginLogicService } from './../../../services/login-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public loginLogic: LoginLogicService) {}

  ngOnInit(): void {
    this.loginLogic.initForm();
  }

}
