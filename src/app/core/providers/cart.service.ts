import { Injectable } from '@angular/core';
import { isUndefined } from 'lodash';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:any = [];
  cartSubject = new BehaviorSubject<any>([]);
  cart$ = this.cartSubject.asObservable();
  constructor() { }

  addToCart = (item:any) =>{
    // item.quantity = 1;
    // this.cart.push(item)
    // this.cartSubject.next(this.cart);
    const productIndex = this.cart.findIndex((cartItem:any) => cartItem.id === item.id);
    if (productIndex > -1) {
        this.cart[productIndex].quantity += 1;
    } else {
        item.quantity = 1;
        this.cart.push(item);
    }
    this.cartSubject.next(this.cart);
  }


  // Increment the quantity of a product in the cart
  incrementProductQuantity(productId: number): void {
    const product = this.cart.find((item:any) => item.id === productId);
    if (product) {
      product.quantity++;
      this.cartSubject.next([...this.cart]);
    }
  }

  // Decrement the quantity of a product in the cart or remove it if quantity becomes 0
  decrementProductQuantity(productId: number): void {
    const productIndex = this.cart.findIndex((item:any) => item.id === productId);
    if (productIndex !== -1) {
      const product = this.cart[productIndex];
      if (product.quantity > 0) {
        product.quantity--;
        if (product.quantity === 0) {
          // Remove the item from the cart if its quantity becomes 0
          this.cart.splice(productIndex, 1);
        }
        this.cartSubject.next([...this.cart]);
      }
    }
  }

  // Calculate the total number of items in the cart
  getTotalItems(): number {
    return this.cart.reduce((total:number, item:any) => total + item.quantity, 0);
  }

  // Clear the cart
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([]);
  }

  // Get the quantity of a product in the cart
  getProductQuantity(productId: number): number {
    const product = this.cart.find((item:any) => item.id === productId);
    return product ? product.quantity : 0;
  }

  // Check if an item is already in the cart
  isItemInCart(productId: number): boolean {
    const product = this.cart.find((item:any) => item.id === productId);
    return !isUndefined(product);
  }
}
