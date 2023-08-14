import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from './core/providers/products.service';
import { Store } from '@ngrx/store';
import * as CategoriesActions  from 'src/app/core/redux/actions/categories.actions';
// import { MatSidenav } from '@angular/material/sidenav';
import { selectIsLoggedIn } from './core/redux/selectors/auth.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'webapp';
  store =inject(Store);
  // @ViewChild('sidenav') sidenav!: MatSidenav;
  isLoggedIn = false;

  obsUnsubscribe = new Subject<any>();

  productList: any = []

  constructor(public productService : ProductsService){
    this.store.dispatch(CategoriesActions.getAllCategories());
  }

  ngOnInit(){
    this.store.select(selectIsLoggedIn).subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

  }

  ngOnDestroy(){

  }
}
