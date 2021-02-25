import { AdminLogicService } from './../../../services/admin-logic.service';
import { CartLogicService } from './../../../services/cart-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  constructor(
    public cartLogic: CartLogicService,
    public adminLogic: AdminLogicService
  ) {}

  ngOnInit(): void {}
}
