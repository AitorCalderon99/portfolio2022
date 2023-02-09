import {User} from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {user: null, authError: null, loading: false};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case "AUTHENTICATE_SUCCESS":
      const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.tokenExpirationDate);
      return {...state, user: user, loading: false, authError: null};
    case "SIGNUP_START":
    case "LOGIN_START":
      return {...state, authError: null, loading: true};
    case "AUTHENTICATE_FAIL":
      return {...state, authError: action.payload, user: null, loading: false};
    case "LOGOUT":
      return {...state, user: null};
    case "CLEAR_ERROR":
      return {...state, authError: null}
    default:
      return state;

  }
}
