import {Action} from "@ngrx/store";

export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const SIGNUP_START = 'SIGNUP_START';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const AUTO_LOGIN = 'AUTO_LOGIN';


export class ClearError implements Action {
  readonly type = CLEAR_ERROR;

}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;

}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) {
  }

}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: { email: string, id: string, token: string, tokenExpirationDate: Date, redirect: Boolean }) {
  }

}

export class Logout implements Action {
  readonly type = LOGOUT;

}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {
  }

}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {
  }

}

export type AuthActions =
  AuthenticateFail
  | Logout
  | LoginStart
  | AuthenticateSuccess
  | SignupStart
  | ClearError
  | AutoLogin;
