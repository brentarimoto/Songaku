/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../../../Song/Song'
import { getSongs } from '../../../../store/songs'
import styles from './UserSongs.module.css'


/*************************** COMPONENTS ***************************/
const UserSongs = ({setCurrentTab})=>{

    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs);

    const {id:userId} = useParams()

    useEffect(()=>{
        setCurrentTab('Songs')
        if(!songs[userId]){
            dispatch(getSongs(userId))
        }
    },[dispatch])

    return(
        <div className={styles.songsDiv}>
            {songs[userId] && Object.entries(songs[userId]).map(([id, song])=>(
                <Song key={id} song={song} userId={userId} />
            ))}
        </div>
    )
}

/*************************** EXPORT ***************************/
export default UserSongs;