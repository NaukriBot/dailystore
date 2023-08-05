import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ProductsService } from './core/providers/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'webapp';
  obsUnsubscribe = new Subject<any>();

  productList: any = []

  constructor(public productService : ProductsService){

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
