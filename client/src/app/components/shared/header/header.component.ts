import { NotificationsService } from './../../../services/notifications.service';
import { LoginLogicService } from './../../../services/login-logic.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthDataService } from 'src/app/services/auth-data.service';

import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() page;
  constructor(
    public loginLogic: LoginLogicService,
    public authData: AuthDataService,
    private toast: NotificationsService
  ) {}

  ngOnInit(): void {}

}
