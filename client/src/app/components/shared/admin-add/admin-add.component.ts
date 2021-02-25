import { AdminLogicService } from './../../../services/admin-logic.service';
import { ProductsLogicService } from './../../../services/products-logic.service';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
})
export class AdminAddComponent implements OnInit {
  constructor(
    public productLogic: ProductsLogicService,
    public adminLogic: AdminLogicService
  ) {}

  ngOnInit(): void {}

  changeFile(e) {
    this.adminLogic.file = e[0];
  }
}
