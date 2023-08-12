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

export const logout = createAction('[LOGOUT]');
