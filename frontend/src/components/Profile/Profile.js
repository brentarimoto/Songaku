/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import UserSongs from './UserSongs/UserSongs'

import styles from './Profile.module.css'


/*************************** COMPONENTS ***************************/
const Profile = ({isLoaded})=>{

    let { path, url } = useRouteMatch();

    return (
        <div className={styles.main}>
            <div className={styles.userDiv}>
                <div className={styles.info}>
                    <h1>User Info</h1>
                </div>
                <div className={styles.itemsDiv}>
                    <div className={styles.itemsNav}>
                        <nav>
                            <NavLink activeClassName={styles.active} exact to={`${url}`}>Base</NavLink>
                            <NavLink activeClassName={styles.active} to={`${url}/songs`}>Songs</NavLink>
                            <NavLink activeClassName={styles.active} to={`${url}/playlists`}>Playlist</NavLink>
                        </nav>
                    </div>
                    <div className={styles.item}>
                        <Switch>
                            <Route exact path={`${path}`}>
                                <h2>Base</h2>
                            </Route>
                            <Route path={`${path}/songs`}>
                                <UserSongs />
                            </Route>
                            <Route path={`${path}/playlists`}>
                                <h2>Playlists</h2>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Profile;