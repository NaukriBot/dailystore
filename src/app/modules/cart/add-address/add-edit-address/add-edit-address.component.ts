import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/core/redux/actions/auth.actions';
import { getUserProfile } from 'src/app/core/redux/selectors/auth.selector';

@Component({
  selector: 'app-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent {
  formTitle: string = 'Address';
  isEdit: boolean = false;
  addressForm!: FormGroup;
  activeUser!: any;
  
  constructor(public fb: FormBuilder,private store: Store, private dialogRef: MatDialogRef<AddEditAddressComponent>) {
    this.setupAddressForm();
    this.valueChangesFields();
  }
  handleAction(){

  }

  getActionButtonLabel(): string {
    return this.isEdit ? 'Update' : 'Submit';
  }
  
  private valueChangesFields() {
    
  }

  ngOnInit(){
    this.store.select(getUserProfile).subscribe((data: any) =>{
      this.activeUser = data;
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  

  setupAddressForm() {
    this.addressForm = this.fb.group({
      title: ['', Validators.required],
      name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.addressForm.value);
    const payload = {
      ...this.addressForm.value,
      userId: this.activeUser["userId"]
    } 

    console.log(payload)
    

    this.store.dispatch(AuthActions.createAddress({payload}))
  }
}
