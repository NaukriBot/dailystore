import { Action, createReducer } from '@ngrx/store';
import * as ProductsActions from '../actions/products.actions';
import { produceOn } from '../helpers/immer.helper';
import { uniqueId } from 'lodash';
export const productsFeatureKey = 'products';

export interface State {
  products: any[];
  selectedProduct: any;
}

export const initialState: State = {
  products: [],
  selectedProduct: {},
};

const _reducer = createReducer(
  initialState,
  produceOn(ProductsActions.getAllProductsSuccess, (draft, action) => {
    draft.products = action.response.map((item: any) => ({
      ...item,
      imageUrl:
        'https://freepngimg.com/thumb/grocery/41619-7-groceries-free-download-image.png', // replace with actual URL or logic to generate it
    }));
  }),
  produceOn(ProductsActions.getProductByIdSuccess, (draft, action) => {
    draft.selectedProduct = action.response;
  }),
  produceOn(ProductsActions.clearSelectedProduct, (draft, action) => {
    draft.selectedProduct = {};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return _reducer(state, action);
}
