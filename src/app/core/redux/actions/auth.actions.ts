import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ user: any }>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: any }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction(
  '[Auth] Logout',
  props<{ refreshToken: string }>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{ response: any; toast?: any }>()
);

export const logoutFailure = createAction(
  '[Auth] Logout failure',
  props<{ error: any }>()
);

export const createAddress = createAction(
  '[Address] Create a new Address',
  props<{ payload: any }>()
);

export const createAddressSuccess = createAction(
  '[Address] Create a new Address Success',
  props<{ response: any; toast: any }>()
);

export const createAddressFailure = createAction(
  '[Address] Create a new Address Failure',
  props<{ error: any }>()
);

// Action to initiate the retrieval of all addresses for a user
export const getAllAddresses = createAction(
  '[Address] Get All Addresses',
  props<{ userId: string }>()
);

// Success action
export const getAllAddressesSuccess = createAction(
  '[Address] Get All Addresses Success',
  props<{ response: any; toast?: any }>()
);

// Failure action
export const getAllAddressesFailure = createAction(
  '[Address] Get All Addresses Failure',
  props<{ error: any }>()
);


// Action to initiate the retrieval of a specific address
export const getSpecificAddress = createAction(
  '[Address] Get Specific Address',
  props<{ userId: string; addressId: string }>()
);

// Success action
export const getSpecificAddressSuccess = createAction(
  '[Address] Get Specific Address Success',
  props<{ response: any; toast?: any }>()
);

// Failure action
export const getSpecificAddressFailure = createAction(
  '[Address] Get Specific Address Failure',
  props<{ error: any }>()
);


// Action to initiate the update of an address
export const updateAddress = createAction(
  '[Address] Update Address',
  props<{ userId: string; addressId: string; payload: any }>() // Where payload contains the updated address details
);

// Success action
export const updateAddressSuccess = createAction(
  '[Address] Update Address Success',
  props<{ response: any; toast?: any }>()
);

// Failure action
export const updateAddressFailure = createAction(
  '[Address] Update Address Failure',
  props<{ error: any }>()
);


// Action to initiate the deletion of an address
export const deleteAddress = createAction(
  '[Address] Delete Address',
  props<{ userId: string; addressId: string }>()
);

// Success action
export const deleteAddressSuccess = createAction(
  '[Address] Delete Address Success',
  props<{ response: any; toast?: any }>()
);

// Failure action
export const deleteAddressFailure = createAction(
  '[Address] Delete Address Failure',
  props<{ error: any }>()
);

