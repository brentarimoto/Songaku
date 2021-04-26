/*************************** REACT IMPORTS ***************************/
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Navigation from './components/Navigation/Navigation'
import UploadForm from './components/UploadForm/UploadForm'
import DeleteSongButton from './components/DeleteSongButton/DeleteSongButton'

import {restoreUser} from './store/session'
import {restoreGenres} from './store/genres'

/*************************** COMPONENTS ***************************/
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.session);

  useEffect(()=>{
    dispatch(restoreUser())
    dispatch(restoreGenres())
  },[dispatch])

  return (
    <>
      <Navigation />

      <Switch>
        <Route exact path='/'>
          <h1>Hello from {user ? user.userName : 'App'}</h1>
          <UploadForm />
          <DeleteSongButton />
        </Route>
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route path='/signup'>
          <SignupForm />
        </Route>
      </Switch>
    </>
  );
}

/*************************** EXPORT ***************************/
export default App;
