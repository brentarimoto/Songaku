/*************************** REACT IMPORTS ***************************/
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'

import {restoreUser} from './store/session'
import {restoreGenres} from './store/genres'

import styles from './App.module.css'

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

      <div className={styles.content}>
        <Switch>
          <Route exact path='/'>
            <h2>Home</h2>
          </Route>
          <Route path='/users/:id'>
            <Profile isLoaded={isLoaded}/>
          </Route>
        </Switch>
      </div>

      <AudioPlayer />
    </>
  );
}

/*************************** EXPORT ***************************/
export default App;
