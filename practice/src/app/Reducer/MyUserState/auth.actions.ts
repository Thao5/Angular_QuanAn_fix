import { ActionType, createAction, createActionGroup, props } from "@ngrx/store"; //auth.actions.ts

export const loginState = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ user: any }>(),
  },
});

export const logoutState = createAction(
  '[auth] Logout'
)
