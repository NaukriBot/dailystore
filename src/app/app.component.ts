import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'webapp';

  productList: any = []

  constructor(public productService : ProductsService){

  }

  ngOnInit(){
    this.productService.getProduct().subscribe((res)=>{
      this.productList = res;
    })
  }
}
