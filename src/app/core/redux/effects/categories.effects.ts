import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromStore from '../reducers/index';
import { Store } from '@ngrx/store';

import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as CategoriesActions from '../actions/categories.actions';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) {}

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
}
