/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import AlbumPage from './AlbumPage'
import Album from './Album'
import {loadAlbums} from '../../../../store/albums'

import styles from './UserAlbums.module.css'


/*************************** COMPONENTS ***************************/
const UserPlaylists = ({setCurrentTab})=>{

    let { path, url } = useRouteMatch();
    const {id:userId} = useParams()

    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs);
    const albums = useSelector(state => state.albums);


    useEffect(()=>{
        setCurrentTab('Albums')
        if(!albums[userId]){
            dispatch(loadAlbums(userId))
        }
    },[dispatch])

    return(
        <>
            <Switch>
                <Route exact path={`${path}`}>
                    <div className={styles.albums}>
                        {albums[userId] && Object.entries(albums[userId]).map(([name, album])=>(
                            <Album key={name} name={name} album={album}/>
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/:name`}>
                    {/* <AlbumPage userId={userId}/> */}
                </Route>
            </Switch>
        </>
    )
}

/*************************** EXPORT ***************************/
export default UserPlaylists;