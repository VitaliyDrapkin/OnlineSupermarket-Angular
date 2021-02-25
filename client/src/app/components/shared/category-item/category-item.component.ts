import { CategoriesService } from './../../../services/categories.service';
import { category } from '../../../models/categoriesResponse';
import { Component, Input, OnInit } from '@angular/core';
import { ProductsLogicService } from 'src/app/services/products-logic.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: category;
  constructor(public productsLogic: ProductsLogicService) {}

  ngOnInit(): void {}
}
