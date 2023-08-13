import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromStore from '../reducers/index';
import * as AuthActions from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// import { startLoadingBar, stopLoadingBar } from '../../app.component';
// import { BrandConfig } from 'app/utils/brandConfig.service';
// import { getLoggedInBusinessId } from '@selectors/session.selectors';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ user }) => {
        const url = 'http://localhost:4000/api/admin-auth/login';
        let obs: Observable<any>;
        obs = this.http.post(url, {
          email: user.userId,
          password: user.password,
        });
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return AuthActions.loginSuccess({
              response: data,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(({ refreshToken }) => {
        const url = 'http://localhost:4000/api/admin-auth/logout';
        let obs: Observable<any>;
        obs = this.http.post(url, {
          refresh_token: refreshToken,
        });
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return AuthActions.logoutSuccess({
              response: data,
            });
          }),
          catchError((error) =>
            of(
              AuthActions.logoutFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  createAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.createAddress),
      switchMap(({ payload }) => {
        console.log(payload);
        const url = `http://localhost:4000/api/users/${payload.userId}/address`;
        let obs: Observable<any>;
        obs = this.http.post(url, payload);
        return obs.pipe(
          map((data: any) => {
            console.log(data);
            return AuthActions.createAddressSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'CHANGES_SAVED' },
            });
          }),
          catchError((error) =>
            of(
              AuthActions.createAddressFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  getAllAddresses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getAllAddresses),
      switchMap(({ userId }) => {
        const url = `http://localhost:4000/api/users/${userId}/address`;
        return this.http.get(url).pipe(
          map((data: any) => {
            return AuthActions.getAllAddressesSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'ADDRESSES_RETRIEVED' },
            });
          }),
          catchError((error) =>
            of(
              AuthActions.getAllAddressesFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  getSpecificAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getSpecificAddress),
      switchMap(({ userId, addressId }) => {
        const url = `http://localhost:4000/api/users/${userId}/address/${addressId}`;
        return this.http.get(url).pipe(
          map((data: any) => {
            return AuthActions.getSpecificAddressSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'ADDRESS_RETRIEVED' },
            });
          }),
          catchError((error) =>
            of(
              AuthActions.getSpecificAddressFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  updateAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateAddress),
      switchMap(({ userId, addressId, payload }) => {
        const url = `http://localhost:4000/api/users/${userId}/address/${addressId}`;
        return this.http.put(url, payload).pipe(
          map((data: any) => {
            return AuthActions.updateAddressSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'ADDRESS_UPDATED' },
            });
          }),
          catchError((error) =>
            of(
              AuthActions.updateAddressFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  deleteAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.deleteAddress),
      switchMap(({ userId, addressId }) => {
        const url = `http://localhost:4000/api/users/${userId}/address/${addressId}`;
        return this.http.delete(url).pipe(
          map((data: any) => {
            return AuthActions.deleteAddressSuccess({
              response: data,
              toast: { type: 'SUCCESS', titleKey: 'ADDRESS_DELETED' },
            });
          }),
          catchError((error) =>
            of(
              AuthActions.deleteAddressFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromStore.State>
  ) {}
}
