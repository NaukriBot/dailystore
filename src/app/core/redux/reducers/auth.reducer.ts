import { Action, createReducer } from '@ngrx/store';
import { merge } from 'lodash';

import * as AuthActions from '../actions/auth.actions';
import { produceOn } from "../helpers/immer.helper";

export const authFeatureKey = 'auth';

export interface State {
    isLoading: boolean;
    error?: Error;
    userId: string;
    email: string,
    name: string,
    sessionId: string;
    refreshToken: string;
}

export const loadSessionFromStorage = () => {
    const session = JSON.parse(sessionStorage.getItem('userSession') || '{}');
    
    if (!session) {
        return {};
    } else {
        return session;
    }
};

export const initialState: State = Object.assign({}, {
    isLoading: false,
    error: undefined,
    userId: '',
    email: '',
    name: '',
    sessionId: '',
    refreshToken: ''
},
    loadSessionFromStorage()
);


const _reducer = createReducer(
    initialState,
    produceOn(AuthActions.login, (draft, action) => {
        draft.isLoading = true;
    }),
    produceOn(AuthActions.loginSuccess, (draft, action) => {
        const response = action.response;
        console.log(response);
        draft = merge(draft, response?.user);
        sessionStorage['userSession'] = JSON.stringify(draft);
    }),
    produceOn(AuthActions.loginFailure, (draft, action) => {
        draft.isLoading = false;
        draft.error = action.error;
    }),
    produceOn(AuthActions.logoutSuccess, (draft, action) => {
        draft.sessionId = '';
        draft.refreshToken = '';
        delete sessionStorage['userSession'];
    })
);

export function reducer(state: State | undefined, action: Action) {
    return _reducer(state, action);
  }
  