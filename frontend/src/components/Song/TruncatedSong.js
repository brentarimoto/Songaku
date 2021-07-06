/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
/*************************** OTHER FILE IMPORTS ***************************/
import DeleteModal from './DeleteSongButton/DeleteModal'
import LikeButton from '../LikeButton/LikeButton'
import EditModal from './Edit/EditModal';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist'
import PlayStatus from './PlayStatus';
import {usePlayerContext} from '../../context/player'
import {setSong} from '../../store/currentSong'
import {loadLikes} from '../../store/likes'

import styles from './TruncatedSong.module.css'

/*************************** COMPONENTS ***************************/
const TruncatedSong = ({song})=>{
    const dispatch = useDispatch()

    const {setPlay} = usePlayerContext()

    const {user} = useSelector(state => state.session);
    const likes = useSelector(state => state.likes);
    const currentSong = useSelector(state => state.currentSong);

    useEffect(()=>{
        if(!likes[song.id]){
            dispatch(loadLikes(song.id))
        }
    },[dispatch])


    const songPlay=(e)=>{
        if(!currentSong){
            dispatch(setSong(song))
            setPlay(true)
        } else if(currentSong.id!==song.id){
            dispatch(setSong(song))
            setPlay(true)
        } else {
            setPlay(prev=>!prev)
        }
    }


    return(
        <div className={styles.songDiv}>
            <div className={styles.albumArtDiv}>
                <img
                    alt=''
                    className={styles.albumArt}
                    src={song?.Album?.url ? song?.Album?.url : (song?.User?.profilePic || '/img/Profile.png')}
                    onClick={songPlay}
                ></img>
                <PlayStatus song={song} styles={styles}/>
            </div>
            <div className={styles.songInfo}>
                <div className={styles.songName}>
                    <Link to={`/users/${song?.User.id}/songs/${song.id}`}>{song?.title}</Link>
                </div>
                <div className={styles.artist}>
                    <Link to={`/users/${song?.User.id}`}>{song?.User.userName}</Link>
                </div>
                <div className={styles.album}>
                    <Link to={`/users/${song?.User.id}/albums/${song?.Album.id}`}>{song?.Album.name}</Link>
                </div>
            </div>
            <div className={styles.extras}>
                    {user &&
                        <>
                            <div className={styles.playlistDiv}>
                                <AddToPlaylist song={song}/>
                            </div>
                        </>
                    }
                    <div className={styles.likesDiv}>
                        {user && <LikeButton songId={song?.id}/>}
                        <div className={styles.likes}>
                            {likes[song.id] && likes[song.id].count} Likes
                        </div>
                    </div>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default TruncatedSong;