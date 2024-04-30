import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CredentialModel } from "./user.model";

export const getUserstate = createFeatureSelector<CredentialModel>('token');

export const getUser = createSelector(getUserstate, (state) => {
  return state.token;
});
