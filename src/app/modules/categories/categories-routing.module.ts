import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';  // You haven't used this yet
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageSubCategoriesComponent } from './manage-sub-categories/manage-sub-categories.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manage',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CategoriesComponent,
    // data: { breadcrumb: 'Categories' },
    children: [
      {
        path: 'manage',
        component: ManageCategoryComponent,
        data: { breadcrumb: 'All Categories' },
      },
      {
        path: ':id/sub-categories/manage',
        component: ManageSubCategoriesComponent,
        data: { breadcrumb: 'All Sub-Categories' },
      },
    ],
  },
  // Use wildcard path for invalid routes
  {
    path: '**',
    redirectTo: 'manage',
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
