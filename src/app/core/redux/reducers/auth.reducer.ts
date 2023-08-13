import { Action, createReducer } from '@ngrx/store';
import { merge } from 'lodash';

import * as AuthActions from '../actions/auth.actions';
import { produceOn } from '../helpers/immer.helper';

export const authFeatureKey = 'auth';

export interface State {
  isLoading: boolean;
  error?: Error;
  userId: string;
  email: string;
  name: string;
  sessionId: string;
  refreshToken: string;
  addresses: Address[];
}

interface Address {
  id: string;
  title: string;
  name: string;
  address1: string;
  address2?: string;
  landmark?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export const loadSessionFromStorage = () => {
  const session = JSON.parse(sessionStorage.getItem('userSession') || '{}');

  if (!session) {
    return {};
  } else {
    return session;
  }
};

export const initialState: State = Object.assign(
  {},
  {
    isLoading: false,
    error: undefined,
    userId: '',
    email: '',
    name: '',
    sessionId: '',
    refreshToken: '',
    addresses: [] as Address[],
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
  }),
  produceOn(AuthActions.createAddressSuccess, (draft, action) => {
    draft.addresses.push(action.response.address);
  }),
  produceOn(AuthActions.getAllAddressesSuccess, (draft, action) => {
    draft.addresses = action.response;

    // Retrieve the current user session from sessionStorage
    const userSession = JSON.parse(sessionStorage['userSession'] || '{}');

    // Update the user session with the new addresses
    userSession.addresses = action.response;

    // Store the updated user session back into sessionStorage
    sessionStorage['userSession'] = JSON.stringify(userSession);
  }),
  produceOn(AuthActions.getSpecificAddressSuccess, (draft, action) => {
    const index = draft.addresses.findIndex(
      (a) => a.id === action.response.address.id
    );
    if (index !== -1) {
      draft.addresses[index] = action.response.address;
    } else {
      draft.addresses.push(action.response.address);
    }
  }),
  produceOn(AuthActions.updateAddressSuccess, (draft, action) => {
    const index = draft.addresses.findIndex(
      (a) => a.id === action.response.address.id
    );
    if (index !== -1) {
      draft.addresses[index] = action.response.address;
    }
  }),
  produceOn(AuthActions.deleteAddressSuccess, (draft, action) => {
    draft.addresses = draft.addresses.filter(
      (a) => a.id !== action.response.address.id
    );
  })
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}
