import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { Store } from '@ngrx/store';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';
import * as CategorySelectors from 'src/app/core/redux/selectors/categories.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { isNull } from 'lodash';

@Component({
  selector: 'app-manage-sub-categories',
  templateUrl: './manage-sub-categories.component.html',
  styleUrls: ['./manage-sub-categories.component.scss']
})
export class ManageSubCategoriesComponent implements OnInit {

  categoryId!: string;
  productList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private actions$: Actions,
    private route: ActivatedRoute  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
    });

    this.store.select(CategorySelectors.getSharedData).subscribe(data => {
      if (!isNull(data)) {
        this.addCategory();
      } else {
        this.dialog.closeAll();
      }
    });

    this.store.select(CategorySelectors.getSubCategoriesForCategory(this.categoryId)).subscribe(data => {
      this.productList = data;
    });
  }

  addCategory(): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: {
        type: 'Sub Category',
        categoryId: this.categoryId
      }
    });
  }

  handleAction({ type, data }: { type: string, data: any }): void {
    switch (type) {
      case 'edit':
        this.handleEdit(data);
        break;
      case 'delete':
        this.handleDelete(data);
        break;
    }
  }

  handleEdit(product: any): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: {
        product,
        type: 'Sub Category',
        categoryId: this.categoryId
      }
    });
  }

  handleDelete(product: any): void {
    this.store.dispatch(CategoriesActions.deleteCategory({ itemId: product._id }));
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategorySuccess),
      rxmap(() => this.store.dispatch(CategoriesActions.getAllCategories()))
    ).subscribe();
  }
}
