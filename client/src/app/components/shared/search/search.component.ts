import { Component, OnInit } from '@angular/core';
import { ProductsLogicService } from 'src/app/services/products-logic.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  constructor(public productLogic: ProductsLogicService) {}

  ngOnInit(): void {}
}
