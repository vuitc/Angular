import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { DetailComponent } from './detail/detail.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { AuthComponent } from './admin/auth/auth.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"shop/:id",component:ShopComponent },
  {path:'detail/:id',component:DetailComponent},
  {path:'admin/category',component:CategoryComponent,canActivate: [authGuard]},
  {path:'admin/category/:id',component:ProductComponent, canActivate: [authGuard]},
  {path:'admin/auth',component:AuthComponent,canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
