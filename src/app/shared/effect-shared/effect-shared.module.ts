import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from 'src/app/core/redux/effects/categories.effects';
import { ProductsEffects } from 'src/app/core/redux/effects/products.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      CategoriesEffects,
      ProductsEffects,
    ])
  ],
  exports: [EffectsModule]
})
export class EffectSharedModule { }
