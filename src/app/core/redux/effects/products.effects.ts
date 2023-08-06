import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromStore from '../reducers/index';

import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import * as ProductsActions from "../actions/products.actions";


@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        // private store: Store<>
    ) { }

    createProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.createProduct),
            switchMap(({ payload }) => {
                const url = 'http://localhost:4000/api/products';
                let obs: Observable<any>;
                obs = this.http.post(url, payload);
                return obs.pipe(
                    map((data: any) => {
                        console.log(data);
                        return ProductsActions.createProductSuccess({
                            response: data,
                            toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
                        });
                    }),
                    catchError((error) =>
                        of(
                            ProductsActions.createProductFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );

    getAllProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getAllProducts),
            switchMap(({}) => {
                const url = 'http://localhost:4000/api/products';
                let obs: Observable<any>;
                obs = this.http.get(url);
                return obs.pipe(
                    map((data: any) => {
                        console.log(data);
                        return ProductsActions.getAllProductsSuccess({
                            response: data,
                            toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
                        });
                    }),
                    catchError((error) =>
                        of(
                            ProductsActions.getAllProductsFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );

    getProductById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductsActions.getProductById),
            switchMap(({id}) => {
                const url = `http://localhost:4000/api/products/${id}`;
                let obs: Observable<any>;
                obs = this.http.get(url);
                return obs.pipe(
                    map((data: any) => {
                        console.log(data);
                        return ProductsActions.getProductByIdSuccess({
                            response: data,
                            toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
                        });
                    }),
                    catchError((error) =>
                        of(
                            ProductsActions.getProductByIdFailure({
                                error,
                            })
                        )
                    )
                );
            })
        )
    );
}