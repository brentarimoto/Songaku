/*************************** REACT IMPORTS ***************************/
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

/*************************** OTHER FILE IMPORTS ***************************/
import Navigation from './components/Navigation/Navigation'
import Profile from './components/Profile/Profile'
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import Search from './components/Search/SearchPage'
import Home from './components/Home/Home'

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
            <Home />
          </Route>
          <Route path={`/users/:id(\\d+)`}>
            <Profile isLoaded={isLoaded}/>
          </Route>
          <Route path={`/search/:searchWords`}>
            <Search />
          </Route>
          <Route>
            <h2>Please Look Somwewhere Else</h2>
          </Route>
        </Switch>
      </div>

      <AudioPlayer />
      <div className={styles.aboutMeSection}>
        <h6>Designed and Created By:</h6>
        <a className={styles.aboutMeName} href="https://brentarimoto.herokuapp.com/">Brent Arimoto</a>
        <h6>/</h6>
        <a className={styles.aboutMeEmail} href="mailto:brentarimoto@gmail.com">brentarimoto@gmail.com</a>
        <a className={styles.aboutMeGithub} href="https://www.linkedin.com/in/brent-arimoto/"><i className="fab fa-linkedin-in"></i></a>
        <a className={styles.aboutMeLinkedIn} href="https://github.com/brentarimoto/"><i className="fab fa-github"></i></a>
      </div>
    </>
  );
}

/*************************** EXPORT ***************************/
export default App;
