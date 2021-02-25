import { PurchaseGuard } from './../guards/purchase.guard';
import { PurchasePageComponent } from './../components/purchase-page/purchase-page.component';
import { NoAdminGuard } from './../guards/no-admin.guard';
import { AdminGuard } from './../guards/admin.guard';
import { DoubleLoginGuard } from './../guards/double-login.guard';
import { AuthGuard } from './../guards/auth.guard';
import { AdminPageComponent } from './../components/admin-page/admin-page.component';
import { RegisterPageComponent } from './../components/register-page/register-page.component';
import { LoginPageComponent } from './../components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from '../components/main-page/main-page.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthGuard, NoAdminGuard],
  },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [DoubleLoginGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [DoubleLoginGuard],
  },
  {
    path: 'purchase',
    component: PurchasePageComponent,
    canActivate: [AuthGuard, PurchaseGuard],
  },
  {
    path: '',
    redirectTo: 'purchase',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
