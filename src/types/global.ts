import { CombinedState, compose, Store } from "redux";
import { InitialStateType } from "./types";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    __store__?: Store<
      CombinedState<{
        eventsReducer: InitialStateType;
        reducerTwo: {};
      }>,
      any
    > & {
      dispatch: unknown;
    };
  }
}
