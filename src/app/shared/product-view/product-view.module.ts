import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ProductViewComponent } from './product-view/product-view.component';



@NgModule({
  declarations: [
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[ 
    ProductViewComponent
  ]
})
export class ProductViewModule { }
