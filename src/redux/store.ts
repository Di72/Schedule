import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import eventsReducer from "./events-reducer";
import reducerTwo from "./reducerTwo";
import thunkMiddleware from "redux-thunk";


let rootReducer = combineReducers({
    eventsReducer,
    reducerTwo
})


export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store