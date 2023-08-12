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
                refresh_token: refreshToken
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



    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromStore.State>,
    ) { }
}
