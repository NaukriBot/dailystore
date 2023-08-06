import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProductsService } from './core/providers/products.service';
import { Store } from '@ngrx/store';
import * as CategoriesActions  from 'src/app/core/redux/actions/categories.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'webapp';
  store =inject(Store);
  
  
  obsUnsubscribe = new Subject<any>();

  productList: any = []

  constructor(public productService : ProductsService){
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  ngOnInit(){
    const obs = this.productService.getProduct();
    obs.subscribe((res)=>{
        this.productList = res;
    })
  
  }

  ngOnDestroy(){

  }
}
