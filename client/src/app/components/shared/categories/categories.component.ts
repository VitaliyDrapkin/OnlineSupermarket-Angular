import { ProductsLogicService } from 'src/app/services/products-logic.service';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(public productsLogic: ProductsLogicService) {}

  ngOnInit(): void {
    this.productsLogic.initCategories();
  }
}
