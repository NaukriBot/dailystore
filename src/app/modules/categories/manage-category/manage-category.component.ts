import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/providers';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { Store } from '@ngrx/store';
import * as CategoriesActions  from 'src/app/core/redux/actions/categories.actions';
import * as CategorySelecors  from 'src/app/core/redux/selectors/categories.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';
@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit{
  productService = inject(ProductsService);
  dialog = inject(MatDialog);
  store =inject(Store);
  actions$ =  inject(Actions);

  productList: any[] = [];
 
  addCategory = () =>{
    const dialogRef = this.dialog.open(AddEditCategoryComponent,{
      width: '500px',
      height: 'auto',
    });
  }
  ngOnInit(){ 
    this.store.dispatch(CategoriesActions.getAllCategories());
    this.store.select(CategorySelecors.getCategoriesList).subscribe((data: any) => this.productList = data);
  }

  handleEdit(product: any) {
    // Open the dialog and edit
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: {
        product: product
      }
    });
  }
  
  handleDelete(product: any) {
    this.store.dispatch(CategoriesActions.deleteCategory({ itemId: product._id }));
    this.actions$
      .pipe(
        ofType(CategoriesActions.deleteCategorySuccess),
        rxmap(() => {
          this.store.dispatch(CategoriesActions.getAllCategories());
        })
      )
      .subscribe();
  }
}
