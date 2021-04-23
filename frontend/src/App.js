/*************************** REACT IMPORTS ***************************/
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import LoginForm from './components/LoginForm/LoginForm'
import SignupForm from './components/SignupForm/SignupForm'
import Navigation from './components/Navigation/Navigation'

import {restoreUser} from './store/session'

/*************************** COMPONENTS ***************************/
function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.session);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    const user = dispatch(restoreUser())
    if(user){
      setIsLoaded(true)
    }
  },[dispatch])

  return isLoaded && (
    <>
      <Navigation />

      <Switch>
        <Route exact path='/'>
          <h1>Hello from {user ? user.username : 'App'}</h1>
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
