import { createReducer, on } from "@ngrx/store"; // auth.reducer.ts
import { loginState, logoutState } from "./auth.actions";


export interface State {
  user: any,
  isLogged: boolean
}

export const initialState: State = {
  user: null,
  isLogged: false
};

export const authReducer = createReducer(
  initialState,
  on(loginState.login, (state, action) => ({
    ...state,
    user: action.user,
    isLogged: true
  })),
  on(logoutState, (state) => ({
    ...state,
    user: '',
    isLogged: false
  }))
);
