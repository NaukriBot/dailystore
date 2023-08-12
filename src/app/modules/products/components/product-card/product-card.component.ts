import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/core/providers/cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: any = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>(); 

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
  onEdit(product:any){
    this.edit.emit(this.product);
  }
  onDelete(product:any){
    this.delete.emit(this.product);
  }
}
