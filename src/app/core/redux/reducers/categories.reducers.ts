import { Action, createReducer } from "@ngrx/store";
import * as CategoriesActions from '../actions/categories.actions';
import { produceOn } from "../helpers/immer.helper";
import { uniqueId } from "lodash";
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
      draft.categories = action.response.map((item:any) => ({
        ...item,
        imageUrl: 'https://freepngimg.com/thumb/grocery/41619-7-groceries-free-download-image.png' // replace with actual URL or logic to generate it
      }));
    }),    
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return _reducer(state, action);
  }
  