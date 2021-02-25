import { Component, OnInit } from '@angular/core';
import { AuthDataService } from 'src/app/services/auth-data.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  constructor(public authData: AuthDataService) {}

  ngOnInit(): void {}
}
