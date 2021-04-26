/*************************** REACT IMPORTS ***************************/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/*************************** OTHER FILE IMPORTS ***************************/

import sessionReducer from './session'
import mySongsReducer from './mySongs'
import genresReducer from './genres'

/*************************** REDUCER ***************************/

const rootReducer  = combineReducers({
  session: sessionReducer,
  mySongs: mySongsReducer,
  genres: genresReducer,
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
