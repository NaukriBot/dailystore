import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { BaseModalService } from 'src/app/core/providers';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
})
export class AddAddressComponent {
  // baseModalService = inject(BaseModalService);

  addressForm!: FormGroup;
  cityOptions$!: Observable<any[]>;
  stateOptions$!: Observable<any[]>;
  countryOptions$!: Observable<any[]>;
  countryList: any[] = [
    {
      id: '1',
      name: 'India',
    },
  ];
  stateList: any[] = [
    {
      id: '1',
      name: 'Delhi',
    },
    {
      id: '2',
      name: 'Karnataka',
    },
    {
      id: '3',
      name: 'Tamil Nadu',
    },
    {
      id: '4',
      name: 'Telangana',
    },
  ];
  cityList: any[] = [
    {
      id: '1',
      name: 'Raipur',
    },
    {
      id: '2',
      name: 'Hyderabad',
    },
    {
      id: '3',
      name: 'Chennai',
    },
    {
      id: '4',
      name: 'Bangalore',
    },
  ];
  constructor(public fb: FormBuilder, public baseModalService: BaseModalService) {
    this.setupAddressForm();
    this.valueChangesFields();
  }

  load(){
    const modalData = {
      config:{
        title: 'Add New Address',
        actions: [
          {
            key: 'submit',
            label:'Submit',
            type:"primary",
            clickAction:()=>{
              console.log('clicked')
            }
          }
        ]
      },
      data:{
        allow: true,
      }
    }
    this.baseModalService.open(CartComponent,modalData,'addressModal')
  }

  private valueChangesFields() {
    this.cityOptions$ = this.addressForm.get('city')!.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map((value) => this._filterList(value || '', this.cityList))
    );

    this.stateOptions$ = this.addressForm.get('state')!.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map((value) => this._filterList(value || '', this.stateList))
    );

    this.countryOptions$ = this.addressForm.get('country')!.valueChanges.pipe(
      startWith(''),
      debounceTime(250),
      map((value) => this._filterList(value || '', this.countryList))
    );
  }

  private _filterList(value: string, list: any[]): any[] {
    return list.filter((obj) =>
      obj.name.toLowerCase().includes(value.toLowerCase())
    );
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
  }
}
