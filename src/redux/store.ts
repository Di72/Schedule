/* eslint-disable no-underscore-dangle */
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import eventsReducer from './events-reducer';
import reducerTwo from './reducerTwo';

const rootReducer = combineReducers({
  eventsReducer,
  reducerTwo,
});

export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.__store__ = store;

export default store;
