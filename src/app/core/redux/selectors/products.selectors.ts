import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productsFeatureKey, State as ProductState } from "../reducers/products.reducers";

export const selectProductState =
  createFeatureSelector<ProductState>(productsFeatureKey);

export const getProuctList = createSelector(
    selectProductState,
    (state:ProductState) => state.products
);

export const getSelectedProduct = createSelector(
  selectProductState,
  (state:ProductState) => state.selectedProduct
);