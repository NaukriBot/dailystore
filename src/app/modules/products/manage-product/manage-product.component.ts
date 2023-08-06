import { Component, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/core/providers';
import { Router, ActivatedRoute } from '@angular/router';
import * as ProductSelectors from 'src/app/core/redux/selectors/products.selectors';
import { Store } from '@ngrx/store';
import * as ProductsActions from 'src/app/core/redux/actions/products.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent {
  productService = inject(ProductsService);
  actions$ = inject(Actions);
  store = inject(Store);
  router = inject(Router);
  productList: any[] = [];
  ngOnInit() {
    this.store.dispatch(ProductsActions.getAllProducts());
    this.store.select(ProductSelectors.getProuctList).subscribe((data: any) => this.productList = data);

    // this.productService.getProduct().subscribe((res)=>{
    //     this.productList = res;
    // })  
  }
  addProduct() {
    this.router.navigate(['/products/add-edit']);
  }

  handleEdit(product: any) {
    this.store.dispatch(ProductsActions.getProductById({ id: product.id }));
    this.actions$
    .pipe(
      ofType(ProductsActions.getProductByIdSuccess),
      rxmap(() => {
        this.router.navigate(['/products/add-edit'], {
          queryParams: { productId: product.id },
        });
      })
    )
    .subscribe();
  }

  handleDelete(product: any) {
    console.log('delete product', product);
  }

}
