/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import UserSongs from './UserSongs/UserSongs'

import styles from './User.module.css'


/*************************** COMPONENTS ***************************/
const User = ({isLoaded})=>{

    let { path, url } = useRouteMatch();

    return (
        <div className={styles.userDiv}>
            <div className={styles.info}>
                <h1>User Info</h1>
            </div>
            <div className={styles.itemsDiv}>
                <nav className={styles.itemsNav}>
                    {/* <NavLink activeClassName={styles.active} exact to={`${url}`}>Base</NavLink> */}
                    <NavLink className={styles.navItem} activeClassName={styles.active} to={`${url}/songs`}>Songs</NavLink>
                    <NavLink className={styles.navItem}  activeClassName={styles.active} to={`${url}/playlists`}>Playlist</NavLink>
                    <div className={styles.navItemSpacer}>
                        <div className={styles.navItemLine}>

                        </div>
                    </div>
                </nav>
                <div className={styles.itemDiv}>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <Redirect to={`${url}/songs`}/>
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
            <div className={styles.suggestionsDiv}>

            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default User;