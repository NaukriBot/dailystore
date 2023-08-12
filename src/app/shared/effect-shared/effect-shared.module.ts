import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from 'src/app/core/redux/effects/categories.effects';
import { ProductsEffects } from 'src/app/core/redux/effects/products.effects';
import { AuthEffects } from 'src/app/core/redux/effects/auth.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      CategoriesEffects,
      ProductsEffects,
      AuthEffects
    ])
  ],
  exports: [EffectsModule]
})
export class EffectSharedModule { }
