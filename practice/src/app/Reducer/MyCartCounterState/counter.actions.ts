import { createAction, props } from "@ngrx/store";

export const increment = createAction("increment", props<{ payload: number }>())
export const decrement = createAction('decrement', props<{ payload: number }>())
export const update = createAction("update", props<{ payload: any }>())
