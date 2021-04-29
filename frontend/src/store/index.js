/*************************** REACT IMPORTS ***************************/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/*************************** OTHER FILE IMPORTS ***************************/

import sessionReducer from './session'
import songsReducer from './songs'
import genresReducer from './genres'
import currentSongReducer from './currentSong'
import commentsReducer from './comments'


/*************************** REDUCER ***************************/

const rootReducer  = combineReducers({
  session: sessionReducer,
  songs: songsReducer,
  genres: genresReducer,
  currentSong: currentSongReducer,
  comments: commentsReducer,
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
