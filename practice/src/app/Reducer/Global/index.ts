import { ActionReducerMap, MetaReducer } from "@ngrx/store"
import { CartState, CounterReducer } from "../MyCartCounterState/counter.reducer"
import { hydrationMetaReducer } from "./hydration.reducer"
import { State, authReducer } from "../MyUserState/auth.reducer"


export interface RootState {
  count: CartState,
  user: State
}

export const reducers: ActionReducerMap<any> = {
  count: CounterReducer,
  user: authReducer
}

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]
