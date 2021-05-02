/*************************** REACT IMPORTS ***************************/
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


/*************************** OTHER FILE IMPORTS ***************************/

import sessionReducer from './session'
import usersReducer from './users'
import songsReducer from './songs'
import genresReducer from './genres'
import currentSongReducer from './currentSong'
import commentsReducer from './comments'
import likesReducer from './likes'
import playlistsReducer from './playlists'
import albumsReducer from './albums'
import searchReducer from './search'

/*************************** REDUCER ***************************/

const rootReducer  = combineReducers({
  session: sessionReducer,
  users: usersReducer,
  songs: songsReducer,
  genres: genresReducer,
  currentSong: currentSongReducer,
  comments: commentsReducer,
  likes: likesReducer,
  playlists: playlistsReducer,
  albums: albumsReducer,
  search: searchReducer,
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
