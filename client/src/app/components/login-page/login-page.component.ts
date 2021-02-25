import { AuthDataService } from './../../services/auth-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(public authData: AuthDataService) {}

  ngOnInit(): void {}
}
