
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { BaseModalService } from 'src/app/core/providers';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';


@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  formType = new FormControl('Category');
  form!: FormGroup;
  categoryOptions$!: Observable<any[]>;
  categoryList: any[] = [
    {
      id: '1',
      name: 'Category 1',
    },
    {
      id: '2',
      name: 'Category 2',
    },
  ];
  constructor(public fb: FormBuilder,public actions$: Actions,private store: Store) {
    this.setupForm();
    this.valueChangesFields();
  }

  private valueChangesFields() {
    this.categoryOptions$ = this.form.get('name')!.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map((value) => this._filterList(value || '', this.categoryList))
    );
  }

  private _filterList(value: string, list: any[]): any[] {
    return list.filter((obj) =>
      obj.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      categoryId: [''],
      description: ['', Validators.required],
      status: ['active'],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    const payload = this.form.value;
    if (isEmpty(payload.categoryId)) {
      delete payload['categoryId'];
    }
    this.store.dispatch(CategoriesActions.createCategory({ payload: this.form.value }));
  }
  
}
