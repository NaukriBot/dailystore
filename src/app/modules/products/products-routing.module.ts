import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductsComponent,
    children: [
      {
        path: 'add-edit',
        component: AddEditProductComponent
      },
      {
        path: 'manage',
        component: ManageProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
