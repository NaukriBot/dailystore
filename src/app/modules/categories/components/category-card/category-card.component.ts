import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/core/providers/cart.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() product: any = [];
  @Output() action = new EventEmitter<{ type: string, data: any }>();

  constructor(public cartService: CartService) { }

  get showViewButton(): boolean {
    return !!this.product?.totalSubCategories;
  }

  onAction(type: string, data: any): void {
    this.action.emit({ type, data });
  }
}
