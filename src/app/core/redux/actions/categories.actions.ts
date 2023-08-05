import { createAction, props } from '@ngrx/store';

export const createCategory = createAction(
  '[Category] Create a new Category',
  props<{
    payload: any
  }>()
);

export const getAllCategories = createAction(
    '[Category] Get all Categories',
);

export const createCategorySuccess = createAction(
    '[Category] Create a new Category Success',
    props<{ response: any, toast: any }>()
);

export const createCategoryFailure = createAction(
    '[Category] Create a new Category Failure',
    props<{ error: any }>()
);
