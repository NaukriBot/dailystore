import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectSharedModule } from './effect-shared/effect-shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ToolbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    EffectSharedModule
  ],
  exports: [FormsModule,ReactiveFormsModule,MaterialModule,ToolbarModule,ComponentsModule]
})
export class SharedModule { }
