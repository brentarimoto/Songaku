/*************************** REACT IMPORTS ***************************/
import { useEffect } from 'react'
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import AlbumPage from './AlbumPage'
import Playlist from '../UserPlaylists/Playlist'
import {loadAlbums} from '../../../../store/albums'

import styles from './UserAlbums.module.css'


/*************************** COMPONENTS ***************************/
const UserAlbums = ({setCurrentTab})=>{

    let { path } = useRouteMatch();
    const {id:userId} = useParams()

    const dispatch = useDispatch()
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
                        {albums[userId] && Object.entries(albums[userId]).map(([id, album])=>(
                            <Playlist key={id} id={id} playlist={album} album={true}/>
                        ))}
                    </div>
                </Route>
                <Route path={`${path}/:albumId`}>
                    <AlbumPage userId={userId} albums={albums}/>
                </Route>
            </Switch>
        </>
    )
}

/*************************** EXPORT ***************************/
export default UserAlbums;