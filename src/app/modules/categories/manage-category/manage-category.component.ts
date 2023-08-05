import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/providers';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { Store } from '@ngrx/store';
import * as CategoryActions  from 'src/app/core/redux/actions/categories.actions';
import * as CategorySelecors  from 'src/app/core/redux/selectors/categories.selectors';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit{
  productService = inject(ProductsService);
  dialog = inject(MatDialog);
  store =inject(Store);

  productList: any[] = [];
 
  addCategory = () =>{
    const dialogRef = this.dialog.open(AddEditCategoryComponent,{
      width: '500px',
      height: 'auto',
    });
  }
  ngOnInit(){ 
    this.store.dispatch(CategoryActions.getAllCategories());
    this.store.select(CategorySelecors.getCategoriesList).subscribe((data: any) => this.productList = data);
  }
}
