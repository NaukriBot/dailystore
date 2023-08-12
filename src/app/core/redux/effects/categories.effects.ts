import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as CategoriesActions from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.placeOrder),
      switchMap(({}) => {
        const url = 'http://localhost:4000/api/orders';
        let obs: Observable<any>;
        obs = this.http.post(url, {});
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return CategoriesActions.placeOrderSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
                CategoriesActions.placeOrderFailure({
                error,
            })
            )
          )
        );
      })
    )
  );

  createCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      switchMap(({ payload }) => {
        const url = 'http://localhost:4000/api/product-categories';
        let obs: Observable<any>;
        obs = this.http.post(url, payload);
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return CategoriesActions.createCategorySuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
                CategoriesActions.createCategoryFailure({
                error,
            })
            )
          )
        );
      })
    )
  );

  updateCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      switchMap(({ payload }) => {
        const url = `http://localhost:4000/api/product-categories/${payload._id}`;
        let obs: Observable<any>;
        obs = this.http.put(url, payload);
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return CategoriesActions.updateCategorySuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
                CategoriesActions.updateCategoryFailure({
                error,
            })
            )
          )
        );
      })
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.getAllCategories),
      switchMap(({}) => {
        const url = 'http://localhost:4000/api/product-categories';
        let obs: Observable<any>;
        obs = this.http.get(url);
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return CategoriesActions.getAllCategoriesSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
                CategoriesActions.getAllCategoriesFailure({
                error,
            })
            )
          )
        );
      })
    )
  );

  deleteCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      switchMap(({itemId}) => {
        const url = `http://localhost:4000/api/product-categories/${itemId}`;
        let obs: Observable<any>;
        obs = this.http.delete(url);
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return CategoriesActions.deleteCategorySuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
                CategoriesActions.deleteCategoryFailure({
                error,
            })
            )
          )
        );
      })
    )
  );
}
