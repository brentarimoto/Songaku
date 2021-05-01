/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import UserSongs from './UserSongs/UserSongs'
import UserPlaylists from './UserPlaylists/UserPlaylists'
import UserAlbums from './UserAlbums/UserAlbums'
import AddPlaylistModal from './AddPlaylist/AddPlaylistModal'

import styles from './User.module.css'


/*************************** COMPONENTS ***************************/
const User = ({isLoaded})=>{

    const { path, url } = useRouteMatch();
    const {id:userId} = useParams()

    const {user} = useSelector(state => state.session);

    const [currentTab, setCurrentTab] = useState('')

    return (
        <div className={styles.userDiv}>
            <div className={styles.info}>
                <h1>User Info</h1>
            </div>
            <div className={styles.itemsDiv}>
                <nav className={styles.itemsNav}>
                    <NavLink className={styles.navItem} activeClassName={styles.active} to={`${url}/songs`} name='Songs' onClick={(e)=>setCurrentTab(e.target.name)}>Songs</NavLink>
                    <NavLink className={styles.navItem} activeClassName={styles.active} to={`${url}/albums`} name='Albums' onClick={(e)=>setCurrentTab(e.target.name)}>Albums</NavLink>
                    <NavLink className={styles.navItem}  activeClassName={styles.active} to={`${url}/playlists`} name='Playlist' onClick={(e)=>setCurrentTab(e.target.name)}>Playlist</NavLink>
                    <div className={styles.navItemSpacer}>
                        <div className={styles.navItemLine}>
                            {(currentTab==='Playlist' && parseInt(userId)===user?.id) && <AddPlaylistModal />}
                        </div>
                    </div>
                </nav>
                <div className={styles.itemDiv}>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <Redirect to={`${url}/songs`}/>
                        </Route>
                        <Route path={`${path}/songs`}>
                            <UserSongs setCurrentTab={setCurrentTab}/>
                        </Route>
                        <Route path={`${path}/albums`}>
                            <UserAlbums setCurrentTab={setCurrentTab}/>
                        </Route>
                        <Route path={`${path}/playlists`}>
                            <UserPlaylists setCurrentTab={setCurrentTab}/>
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