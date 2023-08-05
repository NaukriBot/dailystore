import { Action, createReducer } from "@ngrx/store";
import * as CategoriesActions from '../actions/categories.actions';
import { produceOn } from "../helpers/immer.helper";
export const categoriesFeatureKey = 'categories';

export interface State {
    categories: any[]
};

export const initialState: State = {
    categories : []
};

const _reducer = createReducer(
    initialState,
    produceOn(CategoriesActions.getAllCategoriesSuccess, (draft, action) => {
      draft.categories = action.response;
    }),    
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return _reducer(state, action);
  }
  