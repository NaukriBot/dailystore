import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';
import * as CategorySelectors from 'src/app/core/redux/selectors/categories.selectors';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
})
export class ManageCategoryComponent implements OnInit {
  productList: any[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}

  ngOnInit() {
    this.store
      .select(CategorySelectors.getOnlyCategories)
      .subscribe((data: any) => {
        this.productList = data;
      });
  }

  addCategory(): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: 'auto',
    });
  }

  handleAction({ type, data }: { type: string; data: any }): void {
    switch (type) {
      case 'edit':
        this.handleEdit(data);
        break;
      case 'delete':
        this.handleDelete(data);
        break;
      case 'view':
        this.router.navigate([
          `/categories/${data?._id}/sub-categories/manage`,
        ]);
        break;
      case 'addNew':
        this.router.navigate([
          `/categories/${data?._id}/sub-categories/manage`,
        ]);
        this.store.dispatch(
          CategoriesActions.setSharedData({ data: 'add-new' })
        );
        break;
    }
  }

  handleEdit(product: any): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '500px',
      height: 'auto',
      data: {
        product,
      },
    });
  }

  handleDelete(product: any): void {
    this.store.dispatch(
      CategoriesActions.deleteCategory({ itemId: product._id })
    );
    this.actions$
      .pipe(
        ofType(CategoriesActions.deleteCategorySuccess),
        rxmap(() => this.store.dispatch(CategoriesActions.getAllCategories()))
      )
      .subscribe();
  }

  refreshData(): void {
    // Add logic to refresh data or dispatch the appropriate action.
  }
}
