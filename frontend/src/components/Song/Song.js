/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Link, useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import DeleteModal from './DeleteSongButton/DeleteModal'
import LikeButton from '../LikeButton/LikeButton'
import styles from './Song.module.css'
import EditModal from './Edit/EditModal';
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

    let isUser;

    if(parseInt(userId)===user?.id){
        isUser=true;
    } else {
        isUser=false;
    }

    if(!genres){
        return(
            <h1>Loading...</h1>
        )
    }

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
                    src={song?.img ? song.img : `/img/Profile.png`}
                    onClick={songPlay}
                ></img>
            </div>
            <div className={styles.songInfo}>
                <div className={styles.songName}>
                    <Link to={`/users/${userId}/songs/${song.id}`}>{song?.title}</Link>
                </div>
                <div className={styles.artist}>
                    <h4>{song?.User.userName}</h4>
                </div>
                <div className={styles.album}>
                    <h4>{song?.album}</h4>
                </div>
                <div className={styles.genre}>
                    <h4>{song?.Genre.name}</h4>
                </div>
                <div className={styles.songWave}>

                </div>
            </div>
            <div className={styles.extras}>
                    <div className={styles.likesDiv}>
                        <LikeButton songId={song?.id}/>
                        <div className={styles.likes}>
                            {likes[song.id] && likes[song.id].count}
                        </div>
                    </div>
                    {isUser &&
                    <>
                        <div className={styles.playlistDiv}>
                            Playlist
                        </div>
                        <div className={styles.buttons}>
                            <div className={styles.edit}>
                                <EditModal song={song}/>
                            </div>
                            <div className={styles.delete}>
                                <DeleteModal id={song.id}/>
                            </div>
                        </div>
                    </>
                    }
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Song;