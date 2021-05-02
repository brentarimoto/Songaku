/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Link, useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'
/*************************** OTHER FILE IMPORTS ***************************/
import DeleteModal from './DeleteSongButton/DeleteModal'
import LikeButton from '../LikeButton/LikeButton'
import styles from './Song.module.css'
import EditModal from './Edit/EditModal';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist'
import {usePlayerContext} from '../../context/player'
import {setSong} from '../../store/currentSong'
import {loadLikes} from '../../store/likes'


/*************************** COMPONENTS ***************************/
const Song = ({song, userId})=>{
    const dispatch = useDispatch()

    const {setPlay} = usePlayerContext()

    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);
    const likes = useSelector(state => state.likes);
    const currentSong = useSelector(state => state.currentSong);

    const [likeCount, setLikedCount] = useState(null)

    useEffect(()=>{
        if(!likes[song.id]){
            setLikedCount(dispatch(loadLikes(song.id)))
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
                    className={styles.albumArt}
                    src={song?.Album?.url ? song?.Album?.url : `/img/Profile.png`}
                    onClick={songPlay}
                ></img>
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
                <div className={styles.genre}>
                    <h4>{song?.Genre.name}</h4>
                </div>
            </div>
            <div className={styles.extras}>
                    <div className={styles.likesDiv}>
                        {user && <LikeButton songId={song?.id}/>}
                        <div className={styles.likes}>
                            {likes[song.id] && likes[song.id].count} Likes
                        </div>
                    </div>
                    {song?.User?.id===user?.id &&
                        <>
                            <div className={styles.playlistDiv}>
                                <AddToPlaylist song={song}/>
                            </div>
                            {song.User.id===user.id && song.id!==1 && song.id!==2 &&
                                <div className={styles.buttons}>
                                    <div className={styles.edit}>
                                        <EditModal song={song}/>
                                    </div>
                                    <div className={styles.delete}>
                                        <DeleteModal id={song.id} albumId={song.Album.id}/>
                                    </div>
                                </div>
                            }
                            {(song.id===1 || song.id===2) && <h6>Please Upload Music to Test Edit & Delete</h6>}
                        </>
                    }
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Song;