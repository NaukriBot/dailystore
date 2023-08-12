import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { isArray, isEmpty, isUndefined } from 'lodash';
import { Observable } from 'rxjs';
import * as CategoriesSelecors  from 'src/app/core/redux/selectors/categories.selectors';
import * as CategoriesActions from 'src/app/core/redux/actions/categories.actions';
import { map as rxmap } from 'rxjs/operators';
import { CategoryStatus } from 'src/app/core/enums/category-status.enum';
import { FilterListPipe } from 'src/app/shared/pipes-shared/filter-list.pipe';
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
  formTitle: string = 'Category';
  form!: FormGroup;
  categoryList: any[] = [];

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: { product?: Product, type?:string, categoryId?: string },
    private dialogRef: MatDialogRef<AddEditCategoryComponent>,
    public actions$: Actions,
    private store: Store,
  ) {
    this.setupForm();
    this.extractDialogData();
    
    this.statusList = Object.values(CategoryStatus);
    this.valueChangesFields();
  }

  getCategoryName(categoryList: any[], itemId: any): string | undefined {
    const foundCategory = categoryList.find(category => category.id === itemId);
    return foundCategory ? foundCategory.name : undefined;
  }


  extractDialogData() {
    console.log(this.dialogData?.product);
    if(this.dialogData?.type === 'Sub Category'){
      this.formTitle = 'Sub Category';
      this.loadCatgeoryData();
      this.formType.setValue('Sub Category');
      this.form.get('categoryId')!.setValue(this.dialogData?.categoryId);
      console.log('myform',this.form.value);
    }
    
    
    if (!isUndefined(this.dialogData?.product)) {
      this.patchForm(this.dialogData?.product);
    }    
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

  preparePayload(): any {
    console.log(this);
    const payload = {
      ...this.dialogData?.product,
      ...this.form.value,
    };
    if (this.formType.value !== 'Sub Category' && isEmpty(payload.categoryId)) {
      delete payload.categoryId;
    }
    return payload;
  }

  postDispatchTasks() {
    this.store.dispatch(CategoriesActions.getAllCategories());
    this.store.dispatch(CategoriesActions.clearSharedData());
    this.dialogRef.close();
  }

  onUpdate() {
    const payload = this.preparePayload();
    this.store.dispatch(CategoriesActions.updateCategory({ payload }));
    this.actions$
      .pipe(
        ofType(CategoriesActions.updateCategorySuccess),
        rxmap(this.postDispatchTasks.bind(this))
      )
      .subscribe();
  }

  onSubmit() {
    const payload = this.preparePayload();
    this.store.dispatch(CategoriesActions.createCategory({ payload }));
    this.actions$
      .pipe(
        ofType(CategoriesActions.createCategorySuccess),
        rxmap(this.postDispatchTasks.bind(this))
      )
      .subscribe();
  }

  closeDialog(){
    this.store.dispatch(CategoriesActions.clearSharedData());
    this.dialogRef.close();
  }

  handleAction() {
    if(this.isEdit) {
        this.onUpdate();
    } else {
        this.onSubmit();
    }
  }

  getActionButtonLabel(): string {
      return this.isEdit ? 'Update' : 'Submit';
  }

  ngOnDestroy(){
    this.store.dispatch(CategoriesActions.clearSharedData());
  }
}
