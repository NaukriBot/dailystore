import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import { ManageSubCategoriesComponent } from './manage-sub-categories/manage-sub-categories.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    ManageCategoryComponent,
    CategoryCardComponent,
    ManageSubCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
