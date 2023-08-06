import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/core/providers';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {
  productService = inject(ProductsService);
  router = inject(Router);
  productList: any[] = [];
  ngOnInit(){
    this.productService.getProduct().subscribe((res)=>{
        this.productList = res;
    })  
  }
  addProduct(){
    this.router.navigate(['/products/add-edit']);
  }
}
