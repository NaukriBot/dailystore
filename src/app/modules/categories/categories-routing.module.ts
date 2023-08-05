import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';

const routes: Routes = [
  { 
    path: '', 
    component: CategoriesComponent,
    children: [
      {
        path: 'add-edit',
        component: AddEditCategoryComponent
      },
      {
        path: 'manage',
        component: ManageCategoryComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
