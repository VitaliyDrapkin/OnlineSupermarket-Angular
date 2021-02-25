import { NotificationsService } from './notifications.service';
import { ResetService } from './reset.service';
import { LoginLogicService } from './login-logic.service';
import { ProductsRequestsService } from './products-requests.service';
import { ProductsLogicService } from 'src/app/services/products-logic.service';
import { category } from './../models/categoriesResponse';
import { Injectable } from '@angular/core';
import { product } from '../models/productsResponse';

@Injectable({
  providedIn: 'root',
})
export class AdminLogicService {
  mode = 'simple';

  productToEdit: product = null;
  productId = 0;
  name: string = '';
  file: File = null;
  imgUrl: string = '';
  category: number = 0;
  price: number = 0;
  isError = false;
  errorMessage = '';

  constructor(
    private productLogic: ProductsLogicService,
    private loginLogic: LoginLogicService,
    private reset: ResetService,
    private toast: NotificationsService
  ) {}

  changeMode(value: string, product?: product) {
    this.mode = value;
    if (value === 'edit') {
      this.name = product.name;
      this.productId = product.id;
      this.category = product.categoryId;
      this.price = product.price;
      this.productToEdit = product;
      this.file = null;
    } else {
      this.name = '';
      this.category = 0;
      this.price = 0;
      this.file = null;
    }
  }

  cancel() {
    this.mode = 'simple';
    this.name = '';
    this.category = 0;
    this.price = 0;
  }

  addProduct() {
    this.isError = false;
    const isError = this.validation();
    if (isError) {
      this.isError = true;
      this.errorMessage = isError;
      return;
    }
    const imageError = this.imgValidation();
    if (imageError) {
      this.isError = true;
      this.errorMessage = imageError;
      return;
    }
    this.productLogic.addImage(this.file).subscribe(
      (data) => {
        this.imgUrl = data.imgUrl;
        this.productLogic.addProduct(
          this.name,
          this.category,
          this.price,
          this.imgUrl
        );
        this.mode = 'simple';
      },
      (err) => {
        if (err.status == 401 || err.status === 999) {
          this.reset.reset();
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  editProduct() {
    this.isError = false;
    const isError = this.validation();
    if (isError) {
      this.isError = true;
      this.errorMessage = isError;
      return;
    }
    if (this.file) {
      this.productLogic.addImage(this.file).subscribe(
        (data) => {
          this.imgUrl = data.imgUrl;
          this.productLogic.editProduct(
            this.productId,
            this.name,
            this.category,
            this.price,
            this.imgUrl
          );
          this.mode = 'simple';
        },
        (err) => {
          if (err.status == 401 || err.status === 999) {
            this.reset.reset();
          } else {
            this.toast.showError('Please try later', 'Server error');
          }
        }
      );
    }
    if (
      this.productToEdit.name !== this.name ||
      this.productToEdit.categoryId !== this.category ||
      this.productToEdit.price !== this.price
    ) {
      this.productLogic.editProduct(
        this.productId,
        this.name,
        this.category,
        this.price
      );
    }
    this.mode = 'simple';
  }

  validation() {
    if (this.nameValidation()) {
      return this.nameValidation();
    }

    if (this.categoryValidation()) {
      return this.categoryValidation();
    }

    if (this.priceValidation()) {
      return this.priceValidation();
    }
  }

  nameValidation() {
    if (!this.name.trim()) {
      return 'You must fill name';
    }
  }

  categoryValidation() {
    if (!this.category) {
      return 'You must select category';
    }
  }

  priceValidation() {
    if (!this.price) {
      return 'You must select current price';
    }
  }

  imgValidation() {
    if (!this.file) {
      return 'You must add image';
    }
  }
}
