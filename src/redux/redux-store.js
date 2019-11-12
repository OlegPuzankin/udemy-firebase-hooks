import {createStore, combineReducers, compose} from "redux";

import {linksListReducer} from "./linkListReducer";


// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const combinedReduces = combineReducers({
    links: linksListReducer

});

export const store = createStore(combinedReduces,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//export const store = createStore(combinedReduces, composeEnhancers(applyMiddleware(null)));