import { NotificationsService } from './notifications.service';
import { ResetService } from './reset.service';
import { LoginLogicService } from './login-logic.service';
import { category } from '../models/categoriesResponse';
import { CategoriesService } from './categories.service';
import { ProductsRequestsService } from './products-requests.service';
import { Injectable } from '@angular/core';
import { product } from '../models/productsResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductsLogicService {
  searchValue: '';
  products: product[] = [];
  isCategoriesInit = false;
  categories: category[] = [];
  activeCategoryId = 0;

  constructor(
    private productsRequests: ProductsRequestsService,
    private categoryRequests: CategoriesService,
    private reset: ResetService,
    private toast: NotificationsService
  ) {}

  initCategories = () => {
    if (this.isCategoriesInit) {
      return;
    }
    this.categoryRequests.initCategories().subscribe(
      (data) => {
        this.categories = data.categories;
        this.isCategoriesInit = true;
        this.chooseCategory(this.categories[0].id);
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  };

  chooseCategory(id: number) {
    this.activeCategoryId = id;
    this.getProducts('category', id);
  }

  searchProduct() {
    if (!this.searchValue.trim()) {
      this.chooseCategory(this.categories[0].id);
      this.getProducts('category', this.categories[0].id);
      return;
    }
    this.activeCategoryId = 0;
    this.getProducts('name', this.searchValue);
  }

  getProducts(searchBy: string, value: number | string) {
    this.productsRequests.getProducts(searchBy, value).subscribe(
      (data) => {
        this.products = data.products;
      },
      (err) => {
        if (err.status === 401) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  addProduct(name: string, categoryId: number, price: number, imgUrl: string) {
    this.productsRequests.addProduct(name, categoryId, price, imgUrl).subscribe(
      (data) => {
        if (categoryId == this.activeCategoryId) {
          const newProduct: product = {
            name: name,
            id: data.productId,
            categoryId: categoryId,
            price: price,
            image: imgUrl,
          };
          this.products.push(newProduct);
        }
        this.toast.showInfo('', 'Product added');
      },
      (err) => {
        if (err.status === 401 || err.status === 999) {
          this.reset.reset();
          return;
        } else {
          this.toast.showError('Please try later', 'Server error');
        }
      }
    );
  }

  editProduct(
    productId: number,
    name: string,
    categoryId: number,
    price: number,
    imgUrl?: string
  ) {
    this.productsRequests
      .editProduct(productId, name, categoryId, price, imgUrl)
      .subscribe(
        () => {
          this.products = this.products.map((product) => {
            if (product.id === productId) {
              product.name = name;
              product.categoryId = categoryId;
              product.price = price;
              product.image = imgUrl || product.image;
            }
            return product;
          });
        },
        (err) => {
          if (err.status === 401 || err.status === 999) {
            this.reset.reset();
            return;
          } else {
            this.toast.showError('Please try later', 'Server error');
          }
        }
      );
  }

  addImage(file: File) {
    const formData = this.createFormDataImage(file);
    return this.productsRequests.addProductImage(formData);
  }

  createFormDataImage = (image: File): FormData => {
    const formData = new FormData();
    formData.append('image', image);
    return formData;
  };
}
