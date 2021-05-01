/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import PlaylistPage from './PlaylistPage'
import Playlist from './Playlist'
import {loadPlaylists} from '../../../../store/playlists'

import styles from './UserPlaylists.module.css'


/*************************** COMPONENTS ***************************/
const UserPlaylists = ({setCurrentTab})=>{

    let { path, url } = useRouteMatch();
    const {id:userId} = useParams()

    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs);
    const playlists = useSelector(state => state.playlists);


    useEffect(()=>{
        setCurrentTab('Playlist')
        if(!playlists[userId]){
            dispatch(loadPlaylists(userId))
        }
    },[dispatch])

    return(
        <>
            <Switch>
                <Route exact path={`${path}`}>
                    <div className={styles.playlists}>
                        {playlists[userId] && Object.entries(playlists[userId]).map(([id, playlist])=>(
                            <Playlist key={id} id={id} playlist={playlist}/>
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/:playlistId`}>
                    <PlaylistPage userId={userId}/>
                </Route>
            </Switch>
        </>
    )
}

/*************************** EXPORT ***************************/
export default UserPlaylists;