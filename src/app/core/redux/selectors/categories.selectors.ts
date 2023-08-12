import { createFeatureSelector, createSelector } from "@ngrx/store";
import { categoriesFeatureKey, State as CategoryState } from "../reducers/categories.reducers";

/**
 * NgRx selector to select the entire category state from the store.
 * 
 * This is a feature selector, which directly selects a slice of the state 
 * based on the feature key provided during the setup of the NgRx store.
 */
export const selectCategoryState =
  createFeatureSelector<CategoryState>(categoriesFeatureKey);

/**
 * NgRx selector to retrieve the list of categories from the category state.
 * 
 * This selector uses the previously defined `selectCategoryState` selector 
 * to first select the category state, and then retrieve the list of categories from it.
 */
export const getCategoriesList = createSelector(
    selectCategoryState,
    (state:CategoryState) => state.categories
);

/**
 * NgRx selector to retrieve only the top-level categories.
 * 
 * This selector filters out categories that have a parent category 
 * (i.e., categories with a `categoryId`). It then adds an additional property, 
 * `totalSubCategories`, to each top-level category which denotes the number of 
 * sub-categories it has.
 */
export const getOnlyCategories = createSelector(
  getCategoriesList,
  (categories) => {
      return categories
          .filter(category => !category.categoryId) // Get top-level categories.
          .map(category => ({
              ...category,
              totalSubCategories: categories.filter(child => child.categoryId === category._id).length
          }));
  }
);

/**
 * NgRx selector to retrieve the sub-categories for a specific category.
 * 
 * This selector returns a function that accepts a `categoryId` as a parameter. 
 * When the resulting selector function is called with a specific `categoryId`,
 * it will return all sub-categories that belong to that category.
 * 
 * @param categoryId The ID of the parent category for which to retrieve sub-categories.
 */
export const getSubCategoriesForCategory = (categoryId: string) => createSelector(
  getCategoriesList,
  categories => categories.filter(category => category.categoryId === categoryId)
);

/**
 * NgRx selector to retrieve the shared data from the category state.
 * 
 * This selector uses the previously defined `selectCategoryState` selector 
 * to first select the category state, and then retrieve the shared data from it.
 */
export const getSharedData = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.sharedData
);

export const getOrderData = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.order
);
