import { Component, EventEmitter, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/providers/cart.service';
import { menus } from './toolbar-menus'
import { Store } from '@ngrx/store';
import  * as AuthActions  from 'src/app/core/redux/actions/auth.actions';
import { getRefreshToken } from 'src/app/core/redux/selectors/auth.selector';
import { Actions, ofType } from '@ngrx/effects';
import { map as rxmap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  store =inject(Store);
  actions$ = inject(Actions)
  @Output() toggle = new EventEmitter<void>();
  menusList:any[] = menus;
  refreshToken!: string;
  
    constructor(private router: Router, public cartService: CartService, ){
    this.menusList = menus;
    console.log(this.menusList);
    this.store.select(getRefreshToken).subscribe((refreshToken) => this.refreshToken = refreshToken );
  }

  toggleSidenav() {
    this.toggle.emit();
  }

  getTotalItems(){
    return this.cartService.getTotalItems();
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
  this.store.dispatch(AuthActions.logout({refreshToken: this.refreshToken}));
  this.actions$
      .pipe(
        ofType(AuthActions.logoutSuccess),
        rxmap(() => this.router.navigate(['/auth/login']))
      )
      .subscribe();
  }

  

  ngAfterViewInit() {
    
  }
}
