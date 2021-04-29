/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Link, useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import DeleteSongButton from './DeleteSongButton/DeleteSongButton'
import styles from './Song.module.css'
import EditModal from './Edit/EditModal';
import {setSong} from '../../store/currentSong'


/*************************** COMPONENTS ***************************/
const Song = ({song, userId})=>{
    const dispatch = useDispatch()

    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);

    let isUser;

    if(parseInt(userId)===user?.id){
        isUser=true;
    } else {
        isUser=false;
    }


    const [likes, setLike] = useState(0)

    if(!genres){
        return(
            <h1>Loading...</h1>
        )
    }

    const songPlay=(e)=>{
        dispatch(setSong(song))
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
                <div className={styles.album}>
                    <h4>{song?.album}</h4>
                </div>
                <div className={styles.artist}>
                    <h4>{song?.User.userName}</h4>
                </div>
                <div className={styles.genre}>
                    <h4>{song?.Genre.name}</h4>
                </div>
                <div className={styles.songWave}>

                </div>
                <div className={styles.extras}>
                    <div className={styles.likesDiv}>
                        <div className={styles.likesImg}>

                        </div>
                        <div className={styles.likes}>
                            {likes}
                        </div>
                    </div>
                    {isUser &&
                        <>
                            <div className={styles.edit}>
                                <EditModal song={song}/>
                            </div>
                            <div className={styles.delete}>
                                <DeleteSongButton id={song.id}/>
                            </div>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Song;