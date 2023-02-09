import {createAction, props} from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{
    email: string;
    password: string
  }>()
);

export const authenticateSuccess = createAction(
  '[Auth] Authenticate Success',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean
  }>()
);


export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{
    errorMessage: string
  }>()
);


export const clearError = createAction(
  '[Auth] Clear Error'
);


export const autoLogin = createAction(
  '[Auth] Auto Login'
);


export const logout = createAction(
  '[Auth] Logout'
);
