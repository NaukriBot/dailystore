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
import * as CategoriesSelecors  from 'src/app/core/redux/selectors/categories.selectors';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';
import { map as rxmap } from 'rxjs/operators';
import { CategoryStatus } from 'src/app/core/enums/category-status.enum';
interface Product {
  id?: string;
  name: string;
  categoryId?: string;
  description?: string;
  status?: string;
}

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss'],
})
export class AddEditCategoryComponent {
  formType = new FormControl('Category');
  isEdit: boolean = false;
  statusList: string[] = [];

  form!: FormGroup;
  categoryOptions$!: Observable<any[]>;
  categoryList: any[] = [];
  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: { product?: Product },
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    public actions$: Actions,
    private store: Store
  ) {
    this.setupForm();
    if (!isUndefined(this.dialogData?.product)) {
      this.extractDialogData();
    }
    this.statusList = Object.values(CategoryStatus);
    this.valueChangesFields();
  }

  extractDialogData() {
    console.log(this.dialogData?.product);
    this.patchForm(this.dialogData?.product);
  }

  patchForm(data: any) {
    this.isEdit = true;
    this.form.patchValue(data);
    if (data?.categoryId) {
      this.loadCatgeoryData();
      this.formType.setValue('Sub Category');
      this.form.get('categoryId')!.patchValue(data.categoryId);
    }
    console.log(this.form.value);
  }

  private valueChangesFields() {
    this.formType.valueChanges.subscribe(value => {
      if (value === 'Sub Category') {
        this.loadCatgeoryData();
      }
    });
  }

  private loadCatgeoryData(){
    console.log('changes');
    this.store.select(CategoriesSelecors.getCategoriesList).subscribe((data: any) =>{
      this.categoryList = data
      console.log(this.categoryList)
    });
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [''],
      description: ['', Validators.required],
      status: ['active'],
    });
  }

  onUpdate() {
    const payload = {
      ...this.dialogData.product,
      ...this.form.value,
    };
    console.log(payload);
    if (isEmpty(payload?.categoryId)) {
      delete payload?.categoryId;
    }
    this.store.dispatch(CategoriesActions.updateCategory({ payload }));
    this.actions$
      .pipe(
        ofType(CategoriesActions.updateCategorySuccess),
        rxmap(() => {
          this.store.dispatch(CategoriesActions.getAllCategories());
          this.dialogRef.close();
        })
      )
      .subscribe();
  }

  onSubmit() {
    const payload = this.form.value;

    if (isEmpty(payload.categoryId)) {
      delete payload['categoryId'];
    }
    this.store.dispatch(CategoriesActions.createCategory({ payload }));
    this.actions$
      .pipe(
        ofType(CategoriesActions.createCategorySuccess),
        rxmap(() => {
          this.store.dispatch(CategoriesActions.getAllCategories());
          this.dialogRef.close();
        })
      )
      .subscribe();
  }
}
