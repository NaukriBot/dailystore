import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, inject } from '@angular/core';
import { BaseModalService, CartService } from 'src/app/core/providers';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddAddressComponent } from './add-address/add-address.component';
import { Store } from '@ngrx/store';
import { placeOrder } from 'src/app/core/redux/actions/categories.actions';
import { getOrderData } from 'src/app/core/redux/selectors/categories.selectors';
import { isEmpty } from 'lodash';
declare var Razorpay: any; 
// import { DynamicChildLoaderDirective } from 'src/app/shared/directives/dynamic-child-loader.directive';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  store = inject(Store);
  cartItems: any[] = [
    {
      "id": 1,
      "name": "Product A",
      "weight": "200 gm",
      "price": 150,
      "discount": 110,
      "imageUrl": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "quantity": 1
    },
    {
      "id": 2,
      "name": "Product B",
      "weight": "110 gm",
      "price": 200,
      "discount": 190,
      "imageUrl": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "quantity": 2
    },
    {
      "id": 3,
      "name": "Product C",
      "weight": "110 gm",
      "price": 200,
      "discount": 190,
      "imageUrl": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "quantity": 2
    },
    {
      "id": 4,
      "name": "Product D",
      "weight": "110 gm",
      "price": 200,
      "discount": 190,
      "imageUrl": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "quantity": 2
    },
    {
      "id": 5,
      "name": "Product E",
      "weight": "110 gm",
      "price": 200,
      "discount": 190,
      "imageUrl": "https://material.angular.io/assets/img/examples/shiba2.jpg",
      "quantity": 2
    }
  ];
  order!: any; 

  constructor(public dialog: MatDialog,public baseModalService: BaseModalService,public cartService: CartService){
  }

  ngOnInit(){
    
  }

  openDialog() {
    const modalData = {
      config:{
        title: 'Add New Address',
      },
      data:{
        allow: true,
      }
    }
    this.baseModalService.open(AddAddressComponent,modalData,'addressModal')
  }

  removeFromCart(item: any) {
    // Logic to remove the item from the cart
  }

  checkout() {
    // Logic for checkout
  }

  // Compute the total quantity
  get totalQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Compute the total price
  get totalPrice() {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  incrementQuantity(item:any){
    this.cartService.incrementProductQuantity(item.id)
  }
  decrementQuantity(item:any){
    this.cartService.decrementProductQuantity(item.id)
  }

}
