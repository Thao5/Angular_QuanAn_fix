import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './auth.reducer';

export interface UserLogin {
  user: any
}

export const selectUser = createFeatureSelector<State>('user')

export const authUserSelector = createSelector(
  selectUser, (state) => state
);
