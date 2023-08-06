import { createAction, props } from "@ngrx/store";

export const createProduct = createAction(
    '[Product] Create a new Product',
    props<{ payload: any }>()
);

export const createProductSuccess = createAction(
    '[Product] Create a New Product Success',
    props<{ response: any, toast: any }>()
);

export const createProductFailure = createAction(
    '[Product] Create a new Product Failure',
    props<{  error: any }>()
);

export const getProductById = createAction(
  '[Product] get product by Id',
  props<{ id: string }>()
);

export const getProductByIdSuccess = createAction(
  '[Product] get product by Id success',
  props<{ response: any, toast: any }>()
);

export const getProductByIdFailure = createAction(
  '[Product] get product by Id failure',
  props<{ error: any }>()
);

export const getAllProducts = createAction('[Category] Get all products');

/**
 * Action dispatched when the list of all products is successfully fetched.
 * @response contains the server's response with the list of all products.
 * @toast contains a notification message indicating the success of the action.
 */
export const getAllProductsSuccess = createAction(
  '[Category] Get all products Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in fetching the list of all products.
 * @error contains the error details returned from the server or client-side logic.
 */
export const getAllProductsFailure = createAction(
  '[Product] Get all products Failure',
  props<{ error: any }>()
);