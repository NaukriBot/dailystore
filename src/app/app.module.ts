import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppService } from './app.service';
import { ProductsService } from './core/providers';
import { CartService } from './core/providers';
import { DynamicChildLoaderDirective } from './core/directives/dynamic-child-loader.directive';
import { StoreModule } from '@ngrx/store';
import { REDUCER_TOKEN, metaReducers, reducerProvider } from './core/redux/reducers';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    DynamicChildLoaderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
    EffectsModule.forRoot([]),
  ],
  providers: [AppService,reducerProvider,ProductsService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
