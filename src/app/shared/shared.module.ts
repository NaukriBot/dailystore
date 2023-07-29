import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToolbarModule,
    ComponentsModule
  ],
  exports: [MaterialModule,ToolbarModule,ComponentsModule]
})
export class SharedModule { }
