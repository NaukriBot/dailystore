import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectSharedModule } from './effect-shared/effect-shared.module';
import { PipesSharedModule } from './pipes-shared/pipes-shared.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesSharedModule,
    ToolbarModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    EffectSharedModule
  ],
  exports: [FormsModule,ReactiveFormsModule,MaterialModule,PipesSharedModule,ToolbarModule,ComponentsModule]
})
export class SharedModule { }
