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
  props<{refreshToken: string}>()
);

export const logoutSuccess = createAction(
  '[Auth] Logout Success',
  props<{response:any, toast?: any}>()
)

export const logoutFailure = createAction(
  '[Auth] Logout failure',
  props<{error:any}>()
)
