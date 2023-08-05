import { Component, inject } from '@angular/core';
import { ProductsService } from 'src/app/core/providers/products.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  productService = inject(ProductsService);
  productList: any[] = [];
  
  // constructor(public productService : ProductsService){

  // }

  ngOnInit(){
    const obs = this.productService.getProduct();
    obs.subscribe((res)=>{
        this.productList = res;
    })
  
  }
}
