import { State, createReducer, on } from "@ngrx/store";
import { login, logout } from "./state.action";

export interface UserState {
    user: any;
  }

// export default MyUserReducer;
export function UserReducer(state: any, action: any)
{
    switch (action.type) {
      // ...
      case login.type: {
        return {
          ...state,
          user: action.payload
        };
      }
      case logout.type: {
        return {
          user: null
        };
      }
    }
}