import { AdminLogicService } from './../../../services/admin-logic.service';
import { ProductsLogicService } from './../../../services/products-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit {
  constructor(
    public productLogic: ProductsLogicService,
    public adminLogic: AdminLogicService
  ) {}

  ngOnInit(): void {}

  changeFile(e) {
    this.adminLogic.file = e[0];
  }
}
