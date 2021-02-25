import { AdminLogicService } from '../../../services/admin-logic.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product;
  @Input() page: string;
  isModalOpen = false;
  constructor(public adminLogic: AdminLogicService) {}

  ngOnInit(): void {}

  cancel = () => {
    this.isModalOpen = false;
  };
}
