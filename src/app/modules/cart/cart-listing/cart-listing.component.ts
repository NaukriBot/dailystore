import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.component.html',
  styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent {
  @Input() cartItems:any[] = [];

  incrementQuantity(product:any){

  }
  decrementQuantity(product:any){

  }

  removeFromCart(product:any){

  }
}
