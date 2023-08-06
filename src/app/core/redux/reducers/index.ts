import { InjectionToken } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as fromCategories from './categories.reducers';
import * as fromProducts from './products.reducers';


export interface State {
  categories: fromCategories.State,
  products: fromProducts.State,
}

export const reducers: ActionReducerMap<State> = {
  categories: fromCategories.reducer,
  products: fromProducts.reducer,
};

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>(
  'App Reducers'
);
export const reducerProvider = { provide: REDUCER_TOKEN, useValue: reducers };

export const toastNotificationSubject = new Subject<any>();

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state, action:any): State {
    if (action['toast']) {
      console.log(action);
      toastNotificationSubject.next(action);
    }
    if (action.type === '[LOGOUT]') {
      sessionStorage.removeItem('userSession');
      state = undefined;
    }
    
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = [logger];
