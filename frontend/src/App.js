/*************************** REACT IMPORTS ***************************/
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import SignupForm from './components/Signup/SignupForm'
import Navigation from './components/Navigation/Navigation'
import UploadForm from './components/UploadForm/UploadForm'
import Profile from './components/Profile/Profile'

import {restoreUser} from './store/session'
import {restoreGenres} from './store/genres'

/*************************** COMPONENTS ***************************/
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.session);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    dispatch(restoreUser())
    if(user){
      setIsLoaded(true)
    }
    dispatch(restoreGenres())
  },[dispatch])

  return (
    <>
      <Navigation />

      <Switch>
        <Route exact path='/'>
          <h2>Home</h2>
        </Route>
        <Route path='/upload'>
          <UploadForm />
        </Route>
        <Route path='/users/:id'>
          <Profile isLoaded={isLoaded}/>
        </Route>
      </Switch>
    </>
  );
}

/*************************** EXPORT ***************************/
export default App;
