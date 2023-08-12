import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth/login'
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule), data: { breadcrumb: 'Cart' }  },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),data: { breadcrumb: 'Dashboard' }  },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule), data: { breadcrumb: 'Products' }  },
  { path: 'categories', loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),  data: { breadcrumb: 'Manage Categories' } },
  { path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule), data: { breadcrumb: 'Orders' }  }];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
