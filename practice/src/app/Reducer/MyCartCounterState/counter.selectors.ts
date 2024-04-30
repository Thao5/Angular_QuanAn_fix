import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./counter.reducer";

export const getCounterstate = createFeatureSelector<CartState>('count');

export const getCounter = createSelector(getCounterstate, (state) => {
  return state.counter;
});
