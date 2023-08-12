import { Component, EventEmitter, Output, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/providers/cart.service';
import { menus } from './toolbar-menus'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>();
  menusList:any[] = menus;
  
  constructor(private router: Router, public cartService: CartService){
    this.menusList = menus;
    console.log(this.menusList);
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

  

  ngAfterViewInit() {
    
  }
}
