import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAddressComponent } from './add-address/add-address.component';
import { CartListingComponent } from './cart-listing/cart-listing.component';
import { CartBillDetailsComponent } from './cart-bill-details/cart-bill-details.component';
import { AddEditAddressComponent } from './add-address/add-edit-address/add-edit-address.component';
import { ListAddressComponent } from './add-address/list-address/list-address.component';


@NgModule({
  declarations: [
    CartComponent,
    AddAddressComponent,
    CartListingComponent,
    CartBillDetailsComponent,
    AddEditAddressComponent,
    ListAddressComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
