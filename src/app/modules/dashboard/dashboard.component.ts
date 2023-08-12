import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { CartService, ProductsService } from 'src/app/core/providers';
import { Router, ActivatedRoute } from '@angular/router';
import * as ProductSelectors from 'src/app/core/redux/selectors/products.selectors';
import { Store } from '@ngrx/store';
import * as ProductsActions from 'src/app/core/redux/actions/products.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { deleteCategory, placeOrder } from 'src/app/core/redux/actions/categories.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  productService = inject(ProductsService);
  cartService = inject(CartService);
  actions$ = inject(Actions);
  store = inject(Store);
  router = inject(Router);
  productList: any[] = [];
  ngOnInit() {
    this.store.dispatch(ProductsActions.getAllProducts());
    this.store.select(ProductSelectors.getProuctList).subscribe((data: any) => this.productList = data);
  }

  increment(product:any){
    const payload = product?.id;
    this.cartService.incrementProductQuantity(payload)
  }

  decrement(product:any){
    const payload = product?.id;
    this.cartService.decrementProductQuantity(payload)
  }

  addToCart(product: any){
    const payload = cloneDeep(product);
    this.cartService.addToCart(payload);
  }

  getItemQty(itemId: number){
    return this.cartService.getProductQuantity(itemId);
  }

  isItemInCart(itemId:number){
    return this.cartService.isItemInCart(itemId);
  }
}

