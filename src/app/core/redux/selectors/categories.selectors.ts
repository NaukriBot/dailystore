import { createFeatureSelector, createSelector } from "@ngrx/store";
import { categoriesFeatureKey, State as CategoryState } from "../reducers/categories.reducers";

export const selectCategoryState =
  createFeatureSelector<CategoryState>(categoriesFeatureKey);

export const getCategoriesList = createSelector(
    selectCategoryState,
    (state:CategoryState) => state.categories
);