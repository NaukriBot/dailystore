import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from 'src/app/core/redux/effects/categories.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      CategoriesEffects
    ])
  ],
  exports: [EffectsModule]
})
export class EffectSharedModule { }
