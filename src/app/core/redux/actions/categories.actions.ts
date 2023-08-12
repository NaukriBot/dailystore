import { createAction, props } from '@ngrx/store';

/**
 * Action dispatched to request the creation of a new category.
 * @payload contains the details of the category to be created.
 */
export const createCategory = createAction(
  '[Category] Create a new Category',
  props<{ payload: any }>()
);

/**
 * Action dispatched when a category is successfully created.
 * @response contains the server's response to the creation request.
 * @toast contains a notification message indicating the success of the action.
 */
export const createCategorySuccess = createAction(
  '[Category] Create a new Category Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in creating a category.
 * @error contains the error details returned from the server or client-side logic.
 */
export const createCategoryFailure = createAction(
  '[Category] Create a new Category Failure',
  props<{ error: any }>()
);


/**
 * Action dispatched to request an update to an existing category.
 * @payload contains the updated details of the category.
 */
export const updateCategory = createAction(
  '[Category] Update an existing Category',
  props<{ payload: any }>()
);

/**
 * Action dispatched when an existing category is successfully updated.
 * @response contains the server's response to the update request.
 * @toast contains a notification message indicating the success of the action.
 */
export const updateCategorySuccess = createAction(
  '[Category] Update an existing Category Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in updating a category.
 * @error contains the error details returned from the server or client-side logic.
 */
export const updateCategoryFailure = createAction(
  '[Category] Update an existing Category Failure',
  props<{ error: any }>()
);


/**
 * Action dispatched to request the deletion of an existing category.
 * @itemId represents the unique identifier of the category to be deleted.
 */
export const deleteCategory = createAction(
  '[Category] Delete an existing Category',
  props<{ itemId: any }>()
);

/**
 * Action dispatched when a category is successfully deleted.
 * @response contains the server's response to the deletion request.
 * @toast contains a notification message indicating the success of the action.
 */
export const deleteCategorySuccess = createAction(
  '[Category] Delete an existing Category Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in deleting a category.
 * @error contains the error details returned from the server or client-side logic.
 */
export const deleteCategoryFailure = createAction(
  '[Category] Delete an existing Category Failure',
  props<{ error: any }>()
);


/**
 * Action dispatched to request the list of all categories.
 */
export const getAllCategories = createAction('[Category] Get all Categories');

/**
 * Action dispatched when the list of all categories is successfully fetched.
 * @response contains the server's response with the list of all categories.
 * @toast contains a notification message indicating the success of the action.
 */
export const getAllCategoriesSuccess = createAction(
  '[Category] Get all Categories Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in fetching the list of all categories.
 * @error contains the error details returned from the server or client-side logic.
 */
export const getAllCategoriesFailure = createAction(
  '[Category] Get all Categories Failure',
  props<{ error: any }>()
);



/**
 * NgRx action to set data for the Categories feature.
 * 
 * This action is used to store a shared piece of data in the categories state,
 * which can be helpful in sharing data between different parts of the application
 * without persisting it in the URL or other external storage.
 *
 * @param data The data to be set in the categories state.
 */
export const setSharedData = createAction(
  '[Categories] Set Shared Data',
  props<{ data: any }>()
);

export const clearSharedData = createAction(
  '[Categories] Clear Shared Data'
);


export const placeOrder = createAction(
  '[Categories] PlaceOrder'
);


export const placeOrderSuccess = createAction(
  '[Category] PlaceOrder Success',
  props<{ response: any, toast: any }>()
);

/**
 * Action dispatched when there's an error in creating a category.
 * @error contains the error details returned from the server or client-side logic.
 */
export const placeOrderFailure = createAction(
  '[Category] PlaceOrder Failure',
  props<{ error: any }>()
);
