/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../../../Song/Song'
import styles from './AlbumPage.module.css'


/*************************** COMPONENTS ***************************/
const AlbumPage = ({userId})=>{
    let {name} = useParams()
    name = name.split('%').join(' ')

    const playlists = useSelector(state => state.playlists);
    let songs;

    // if(playlists[userId]){
    //     songs = playlists[userId][playlistId].songs
    // }

    // const name = playlists[userId] ? playlists[userId][playlistId].name : null;

    return(
        <div className={styles.playlistSongsDiv}>
            <div className={styles.playlistHeaderDiv}>
                <h2 className={styles.playlistName}>{name}</h2>
            </div>
            <div className={styles.playlistSongs}>
                {songs && Object.entries(songs).map(([id, song])=>(
                    <Song key={id} song={song} userId={userId} />
                ))}
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default AlbumPage;