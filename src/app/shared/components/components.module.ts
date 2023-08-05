import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card/product-card.component';
import { MaterialModule } from '../material/material.module';
import { CategoryCardComponent } from './category-card/category-card.component';
import { FileUploaderSingleImageComponent } from './file-uploader/file-uploader-single-image/file-uploader-single-image.component';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { CardBadgeComponent } from './card-badge/card-badge.component';



@NgModule({
  declarations: [
    CategoryCardComponent,
    ProductCardComponent,
    BaseModalComponent,
    CardBadgeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CategoryCardComponent,
    ProductCardComponent,
    BaseModalComponent,
    CardBadgeComponent
  ]
})
export class ComponentsModule { }
