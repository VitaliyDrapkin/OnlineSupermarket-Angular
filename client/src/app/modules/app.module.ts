import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { TokenInterceptor } from './../interceptors/token.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from '../components/layout/layout.component';
import { LoginPageComponent } from '../components/login-page/login-page.component';
import { RegisterPageComponent } from '../components/register-page/register-page.component';
import { MainPageComponent } from '../components/main-page/main-page.component';
import { LoginComponent } from '../components/shared/login/login.component';
import { RegisterComponent } from '../components/shared/register/register.component';
import { ShopInfoComponent } from '../components/shared/shop-info/shop-info.component';
import { FirstStepRegisterComponent } from '../components/shared/first-step-register/first-step-register.component';
import { SecondStepRegisterComponent } from '../components/shared/second-step-register/second-step-register.component';
import { LoginModalComponent } from '../components/shared/login-modal/login-modal.component';
import { HeaderComponent } from '../components/shared/header/header.component';
import { CartNavComponent } from '../components/shared/cart-nav/cart-nav.component';
import { CartComponent } from '../components/shared/cart/cart.component';
import { ProductItemComponent } from '../components/shared/product-item/product-item.component';
import { SearchComponent } from '../components/shared/search/search.component';
import { CategoriesComponent } from '../components/shared/categories/categories.component';
import { CategoryItemComponent } from '../components/shared/category-item/category-item.component';
import { CartContentComponent } from '../components/shared/cart-content/cart-content.component';
import { CartItemComponent } from '../components/shared/cart-item/cart-item.component';
import { AddProductModalComponent } from '../components/shared/add-product-modal/add-product-modal.component';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { AdminSidebarComponent } from '../components/shared/admin-sidebar/admin-sidebar.component';
import { AdminAddComponent } from '../components/shared/admin-add/admin-add.component';
import { AdminEditComponent } from '../components/shared/admin-edit/admin-edit.component';
import { PurchasePageComponent } from '../components/purchase-page/purchase-page.component';
import { PurchaseHeaderComponent } from '../components/shared/purchase-header/purchase-header.component';
import { PurchaseCartComponent } from '../components/shared/purchase-cart/purchase-cart.component';
import { PurchaseOrderComponent } from '../components/shared/purchase-order/purchase-order.component';
import { PurchaseCartSearchPipe } from '../pipes/purchase-cart-search.pipe';
import { PurchaseModalComponent } from '../components/shared/purchase-modal/purchase-modal.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
@NgModule({
  declarations: [
    LayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    ShopInfoComponent,
    FirstStepRegisterComponent,
    SecondStepRegisterComponent,
    LoginModalComponent,
    HeaderComponent,
    CartNavComponent,
    CartComponent,
    ProductItemComponent,
    SearchComponent,
    CategoriesComponent,
    CategoryItemComponent,
    CartContentComponent,
    CartItemComponent,
    AddProductModalComponent,
    AdminPageComponent,
    AdminSidebarComponent,
    AdminAddComponent,
    AdminEditComponent,
    PurchasePageComponent,
    PurchaseHeaderComponent,
    PurchaseCartComponent,
    PurchaseOrderComponent,
    PurchaseCartSearchPipe,
    PurchaseModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    ToastrModule.forRoot(),
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [LayoutComponent],
})
export class AppModule {}
