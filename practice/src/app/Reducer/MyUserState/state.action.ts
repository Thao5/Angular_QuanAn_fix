import { createAction, props } from "@ngrx/store";

export const login = createAction("login", props<{ payload: any }>())
export const logout = createAction('logout', props<{ payload: any }>())
