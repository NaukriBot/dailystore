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

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent {
  isEdit: boolean = false;
  statusList: string[] = [];

  form!: FormGroup;
  categoryList: any[] = [];
  
  constructor(
    public fb: FormBuilder,
    public actions$: Actions,
    private store: Store
  ) {
    this.setupForm();
    this.loadCatgeoryData();
    this.statusList = Object.values(CategoryStatus);
    this.valueChangesFields();
  }

  patchForm(data: any) {
    this.isEdit = true;
  }

  private valueChangesFields() {
    
  }

  private loadCatgeoryData(){
    this.store.select(CategoriesSelecors.getCategoriesList).subscribe((data: any) =>{
      this.categoryList = data
    });
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [''],
      description: ['', Validators.required],
      discountedprice: ['active'],
      sellingPrice: ['active'],
      costPrice: ['active'],
      status: ['active'],
    });
  }

  onUpdate() {
    const payload = this.form.value;
    console.log(payload)
  }

  onSubmit() {
    const payload = this.form.value;
    console.log(payload)
  }
}
