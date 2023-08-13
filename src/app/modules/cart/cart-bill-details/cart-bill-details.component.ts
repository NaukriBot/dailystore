import { Component,inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
  selector: 'app-cart-bill-details',
  templateUrl: './cart-bill-details.component.html',
  styleUrls: ['./cart-bill-details.component.scss']
})
export class CartBillDetailsComponent {
  dialog = inject(MatDialog);
  openAddressDialog(){
    this.dialog.open(AddAddressComponent, {
      width: '500px',
      height: 'auto',
    });
  }

  proceedToPay(){
    
  }
}
