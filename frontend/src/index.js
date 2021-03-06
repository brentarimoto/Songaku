/*************************** REACT IMPORTS ***************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/*************************** OTHER FILE IMPORTS ***************************/

import App from './App';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import ModalProvider from './context/Modal'

import PlayerProvider from './context/player'

import './index.css';

/*************************** SETUP ***************************/

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
}

/*************************** COMPONENTS ***************************/

function Root() {
  return (
    <Provider store={store}>
      <PlayerProvider>
        <ModalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ModalProvider>
      </PlayerProvider>
    </Provider>
  );
}

/*************************** RENDER ***************************/

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
