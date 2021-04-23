/*************************** REACT IMPORTS ***************************/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/*************************** OTHER FILE IMPORTS ***************************/

import sessionReducer from './session'

/*************************** REDUCER ***************************/

const rootReducer  = combineReducers({
  session: sessionReducer
});

/*************************** ENHANCER/MIDDLEWARE ***************************/

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


/*************************** CREATE STORE ***************************/

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


/*************************** EXPORT ***************************/

export default configureStore;
