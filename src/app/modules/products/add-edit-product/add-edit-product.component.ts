import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isEmpty, isUndefined } from 'lodash';
import { Observable, debounceTime, map, merge, startWith } from 'rxjs';
import { BaseModalService } from 'src/app/core/providers';
import * as CategoriesSelecors from 'src/app/core/redux/selectors/categories.selectors';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';
import { map as rxmap } from 'rxjs/operators';
import { CategoryStatus } from 'src/app/core/enums/category-status.enum';
import * as ProductsActions from 'src/app/core/redux/actions/products.actions';
import { ActivatedRoute, Router } from '@angular/router';
import * as ProductSelectors  from 'src/app/core/redux/selectors/products.selectors';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit: boolean = false;
  statusList: string[] = [];

  form!: FormGroup;
  categoryList: any[] = [];
  productId!: string;

  productData!: any;

  constructor(
    public fb: FormBuilder,
    public actions$: Actions,
    private store: Store
  ) {

    this.setupForm();
    this.loadProductData();
    this.parseQueryParems();

    this.loadCatgeoryData();
    this.statusList = Object.values(CategoryStatus);
    this.valueChangesFields();
  }

  parseQueryParems() {
    if (this.route?.snapshot?.params) {
      const { productId } = this.route.snapshot.queryParams;
      if (!isUndefined(productId)) {
        this.productId = productId;
        //dispatch
        if(isEmpty(this.productData)) {
          this.store.dispatch(ProductsActions.getProductById({ id: this.productId }));
        }
      }
    }
  }

  patchForm(data: any) {
    this.isEdit = true;
    this.form.patchValue(data);
  }

  private valueChangesFields() {

  }

  private loadCatgeoryData() {
    this.store.select(CategoriesSelecors.getCategoriesList).subscribe((data: any) => {
      this.categoryList = data
    });
  }

  private loadProductData() {
    this.store.select(ProductSelectors.getSelectedProduct).subscribe((response) => {
      if(!isEmpty(response)) {
        this.productData = response;
        this.patchForm(this.productData);
      }
    })
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [''],
      description: ['', Validators.required],
      discountedPrice: [''],
      sellingPrice: [''],
      costPrice: [''],
      status: ['active'],
    });
  }

  onUpdate() {
    this.productData = {
      ...this.productData,
      ...this.form.value,
    }
    this.store.dispatch(ProductsActions.updateProduct({ payload: this.productData }));
    this.actions$
      .pipe(
        ofType(ProductsActions.updateProductSuccess),
        rxmap(() => {
          this.store.dispatch(ProductsActions.getAllProducts());
          this.store.dispatch(ProductsActions.clearSelectedProduct());
          this.router.navigate(['/products/manage']);
        })
      )
      .subscribe();
  }

  onSubmit() {
    const payload = this.form.value;
    console.log(payload)
    this.store.dispatch(ProductsActions.createProduct({ payload }),);
    this.actions$
      .pipe(
        ofType(ProductsActions.createProductSuccess),
        rxmap(() => {
          this.router.navigate(['/products/manage']);
        })
      )
      .subscribe();
  }
}
