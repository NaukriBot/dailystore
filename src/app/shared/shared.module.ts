import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ProductViewModule } from './product-view/product-view.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ToolbarModule,
    ProductViewModule
  ],
  exports: [MaterialModule,ToolbarModule,ProductViewModule]
})
export class SharedModule { }
