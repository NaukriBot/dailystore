import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/core/providers/cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any = [];

  constructor(public cartService: CartService){

  }
  decrement = (itemId: number) => {
    this.cartService.decrementProductQuantity(itemId);
  }

  increment = (itemId: number) =>{
    this.cartService.incrementProductQuantity(itemId);
  }

  getItemQty(itemId: number){
    return this.cartService.getProductQuantity(itemId);
  }

  isItemInCart(itemId:number){
    return this.cartService.isItemInCart(itemId);
  }

  addItemToCart(item:any){
    this.cartService.addToCart(item);
    this.cartService.cart$.subscribe((res:any)=>{
      console.log(res);
    })
  }
}
