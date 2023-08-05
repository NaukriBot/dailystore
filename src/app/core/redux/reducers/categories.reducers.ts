import { Action, createReducer } from "@ngrx/store";
import * as CategoriesActions from '../actions/categories.actions';
import { produceOn } from "../helpers/immer.helper";

export interface State {
    categories: any[]
};

export const initialState: State = {
    categories : []
};

const _reducer = createReducer(
    initialState,
    // produceOn(CategoriesActions.getAllCategories, (draft, action) => {
    //   draft.categories = action.response.data;
    // }),    
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return _reducer(state, action);
  }
  