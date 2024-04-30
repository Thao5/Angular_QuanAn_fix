import { createReducer, on } from "@ngrx/store";
import { UserState } from "./user.state";
import { login } from "./user.actions";

const _userReducer = createReducer(
  UserState,
  on(login, (state, action) => {
    return {
      ...state,
      token: action.token
    };
  })
);

export function UserReducer(state: any, action: any) {
  return _userReducer(state, action);
}
