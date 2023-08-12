import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { BaseModalComponent } from './base-modal/base-modal.component';
import { CardBadgeComponent } from './card-badge/card-badge.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    BaseModalComponent,
    CardBadgeComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    BaseModalComponent,
    CardBadgeComponent,
    BreadcrumbComponent
  ]
})
export class ComponentsModule { }
