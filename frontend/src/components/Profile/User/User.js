/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import UserSongs from './UserSongs/UserSongs'
import UserPlaylists from './UserPlaylists/UserPlaylists'
import UserAlbums from './UserAlbums/UserAlbums'
import AddPlaylistModal from './AddPlaylist/AddPlaylistModal'
import Suggestions from '../../Suggestions/Suggestions'

import {getUser} from '../../../store/users'

import styles from './User.module.css'


/*************************** COMPONENTS ***************************/
const User = ()=>{
    const dispatch=useDispatch()
    const { path, url } = useRouteMatch();
    const {id:userId} = useParams()

    const users = useSelector(state => state.users);
    const {user} = useSelector(state => state.session);
    const songs = useSelector(state => state.songs[userId]);
    const albums = useSelector(state => state.albums[userId]);
    const playlists = useSelector(state => state.playlists[userId]);

    const [currentTab, setCurrentTab] = useState('')

    useEffect(()=>{
        if(!users[userId]){
            dispatch(getUser(userId))
        }
    },[dispatch])

    const pageUser = users[userId]

    return (
        <div className={styles.userDiv}>
            <div className={styles.info}>
                <div className={styles.profPicDiv}>
                    <img className={styles.profPic} src={pageUser?.profilePic ? pageUser.profilePic : `/img/Profile.png`}></img>
                </div>
                <div className={styles.nameSection}>
                    <div className={styles.userName}>
                        <h2>{pageUser?.userName}</h2>
                    </div>
                    <div className={styles.firstName}>
                        <h4>{pageUser?.firstName && `(${pageUser?.firstName}`}</h4>
                    </div>
                    <div className={styles.lastName}>
                        <h4>{pageUser?.lastName && `${pageUser?.lastName})`}</h4>
                    </div>
                </div>
                <div className={styles.otherInfo}>
                    <h4 className={styles.about}>{pageUser?.about}</h4>
                    {/* <div className={styles.songCount}>
                        <h4>Songs: {Object.keys(songs || {})?.length}</h4>
                    </div>
                    <div className={styles.albumCount}>
                        <h4>Albums: {Object.keys(albums || {})?.length}</h4>
                    </div>
                    <div className={styles.playlistCount}>
                        <h4>Playlists: {Object.keys(playlists || {})?.length}</h4>
                    </div> */}
                </div>
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
            <div className={styles.topSongsDiv}>
                <Suggestions genreId={4}/>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default User;