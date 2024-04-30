import { createReducer, on } from "@ngrx/store";
import { decrement, increment, update } from "./counter.actions";

export interface CartState {
    counter: number;
  }

export const initialState: CartState = {
    counter: 0,
  };

  const MyCartCounterReducer = createReducer(initialState,
     on(increment, (state, action)=> {
        return {
            ...state,
             counter: state.counter + action.payload
        };
  }),
  on(decrement, (state, action) => {
    return {
        ...state,
         counter: state.counter - action.payload
    };
  }),
  on(update, (state, action) => {
    return {
        ...state,
         counter: action.payload
    };
  })
);

export function CounterReducer(state:any, action: any)
{
    return MyCartCounterReducer(state,action);
}
