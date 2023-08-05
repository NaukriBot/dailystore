import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/core/providers';
import { onDestroy } from 'src/app/core/providers';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {
  productService = inject(ProductsService);
  productList: any[] = [];
  ngOnInit(){
    this.productService.getProduct().subscribe((res)=>{
        this.productList = res;
    })  
  }
  addProduct(){
    console.log('ad')
  }
}
