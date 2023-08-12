import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, State as AuthState } from '../reducers/auth.reducer';
import { cloneDeep, get, keys, map, values } from 'lodash';


export const selectAuthState =
    createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsLoggedIn = createSelector(
    selectAuthState,
    (state: AuthState): boolean => !!state.sessionId
);

export const getSessionId = createSelector(
    selectAuthState,
    (state: AuthState) => state.sessionId
);

// this is to print the user profile in navbar
export const getUserProfile = createSelector(
    selectAuthState,
    (session) => ({
        name: session['name'],
        email: session['email'],
    })
);
