/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider'

/*************************** OTHER FILE IMPORTS ***************************/
import Comment from './Comment/Comment'
import LikeButton from '../LikeButton/LikeButton'
import AddToPlaylist from '../Song/AddToPlaylist/AddToPlaylist'

import {loadComments, postComment} from '../../store/comments'
import {usePlayerContext} from '../../context/player'
import {setSong} from '../../store/currentSong'
import {getSongs} from '../../store/songs'




import styles from './SongPage.module.css'

/*************************** COMPONENTS ***************************/


/*************************** COMPONENTS ***************************/
const SongPage = ({isLoaded})=>{

    const {
        play, setPlay,
        time, setTime,
        totalTime, setTotalTime,
        percent, setPercent,
        volPercent, setVolPercent,
        volume, setVolume,
        mute, setMute
    } = usePlayerContext()


    const dispatch = useDispatch();

    const {id, songId} = useParams();

    const {user} = useSelector(state => state.session);
    const songs = useSelector(state => state.songs);
    const currentSong = useSelector(state => state.currentSong);
    const comments = useSelector(state => state.comments);
    const likes = useSelector(state => state.likes);

    const [myComment, setMyComment] = useState('')

    useEffect(()=>{
        if(!comments[songId]){
            dispatch(loadComments(songId))
        }
    },[dispatch])

    if(!songs[id]){
        dispatch(getSongs(id))
        return(null)
    }

    const song = songs[id][songId]

    const songPlay=(e)=>{
        if(!currentSong){
            dispatch(setSong(song))
            setPlay(true)
        } else if(currentSong?.id!==song?.id){
            dispatch(setSong(song))
            setPlay(true)
        } else {
            setPlay(prev=>!prev)
        }
    }

    const handleComment=()=>{
        dispatch(postComment(myComment, user.id, songId))
    }

    return (
        <div className={styles.mainSongPage}>
            <div className={styles.songDiv}>
                <div className={styles.songInfo}>
                    <div className={styles.songName}>
                        <Link to={`/users/${user?.id}/songs/${song?.id}`}>{song?.title}</Link>
                        <h5 className={styles.songHeader}>Song:</h5>
                    </div>
                    <div className={styles.artist}>
                        <Link to={`/users/${song?.User.id}`}>{song?.User.userName}</Link>
                        <h5 className={styles.songHeader}>Artist:</h5>
                    </div>
                    <div className={styles.album}>
                        <Link to={`/users/${song?.User.id}/albums/${song?.Album.id}`}>{song?.Album.name}</Link>
                        <h5 className={styles.songHeader}>Album:</h5>
                    </div>
                    <div className={styles.genre}>
                        <h3>{song?.Genre.name}</h3>
                        <h5 className={styles.songHeader}>Genre:</h5>
                    </div>
                </div>
                <div className={styles.albumArtDiv}>
                    <img
                        className={styles.albumArt}
                        src={song?.Album.url ? song?.Album.url : `/img/Profile.png`}
                        onClick={songPlay}
                    ></img>
                </div>
                <div className={styles.extras}>
                    <div className={styles.likesDiv}>
                        {user && <LikeButton songId={song?.id}/>}
                        <div className={styles.likes}>
                            {likes[song?.id] && likes[song?.id].count} Likes
                        </div>
                    </div>
                    {user && <div className={styles.playlistDiv}>
                        <AddToPlaylist song={song} userId={user.id}/>
                    </div>}
                </div>
                <div className={styles.waveform}>
                    <ReactSlider
                        value={currentSong?.id === song?.id ? percent : 0}
                        className='seekSlider songSlider'
                        thumbClassName='seekThumb songThumb'
                        trackClassName='seekTrack'
                        step={.01}
                        orientation='horizontal'
                        renderThumb={(props, state) => <div {...props}>{currentSong?.id === song?.id ? time : null}</div>}
                    />
                </div>
            </div>
            <div className={styles.myCommentSection}>
                <div className={styles.myCommentContainer}>
                    <div className={styles.myProfPicDiv}>
                        <img
                            className={styles.myProfPic}
                            src={user?.profilePic ? user.profilePic : `/img/Profile.png`}
                        ></img>
                    </div>
                    <div className={styles.myCommentDiv}>
                        <textarea
                            value={myComment}
                            className={styles.myComment}
                            onChange={(e)=>setMyComment(e.target.value)}
                        ></textarea>
                        <button onClick={handleComment}>Comment</button>
                    </div>
                </div>
            </div>
            <div className={styles.commentsDiv}>
                {comments[songId] && Object.keys(comments[songId]).reverse().map((id)=>(
                    <Comment key={comments[songId][id].id} comment={comments[songId][id]} songId={songId}/>
                ))}
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default SongPage;