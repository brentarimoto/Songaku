/*************************** REACT IMPORTS ***************************/
import { useEffect, useRef, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player/lazy'
import ReactSlider from "react-slider";

/*************************** OTHER FILE IMPORTS ***************************/
import styles from './AudioPlayer.module.css'
import {usePlayerContext} from '../../context/player'
import './Slider.css'


/*************************** HELPER FUNCTION ***************************/
function secondsToMinutes(seconds){
    let temp = ((seconds/60).toFixed(4)).split('.')
    temp[1]=(Math.round(parseFloat('.'+temp[1])*60))
    if(temp[1].toString().length<=1){temp[1]='0'+temp[1]}
    return temp.join(':')
}


/*************************** COMPONENTS ***************************/
const PlayPause = ({play, setPlay, currentSong})=>{
    const handlePlay=(e)=>{
        if(!currentSong){return}
        setPlay(prev=>!prev)
    }

    if(!play){
        return(
            <div className={styles.playDiv}>
                <i className={`fas fa-play ${styles.play}`} onClick={handlePlay}></i>
            </div>
        )
    } else {
        return(
            <div className={styles.pauseDiv}>
                <i className={`fas fa-pause ${styles.pause}`} onClick={handlePlay}></i>
            </div>
        )
    }
}

const Mute = ({mute, setMute, currentSong})=>{
    const handleMute=(e)=>{
        setMute(prev=>!prev)
    }

    if(mute){
        return(
            <div className={styles.muteDiv}>
                <i className={`fas fa-volume-mute ${styles.mute}`} onClick={handleMute}></i>
            </div>
        )
    } else {
        return(
            <div className={styles.unmuteDiv}>
                <i className={`fas fa-volume-off ${styles.unmute}`} onClick={handleMute}></i>
            </div>
        )
    }
}

const AudioPlayer = ({song, userId})=>{
    const currentSong = useSelector(state=>state.currentSong)

    const {
        play, setPlay,
        time, setTime,
        totalTime, setTotalTime,
        percent, setPercent,
        volPercent, setVolPercent,
        volume, setVolume,
        mute, setMute
    } = usePlayerContext()

    const valueRef = useRef(null);

    const handleBackward=()=>{
        valueRef.current.seekTo(valueRef.current.getCurrentTime() - 10)
    }

    const handleForward=()=>{
        valueRef.current.seekTo(valueRef.current.getCurrentTime() + 10)
    }

    const handleSeek=(val)=>{
        valueRef.current.seekTo(val/100*totalTime)
    }

    const handleVol=(val)=>{
        setVolPercent(val/100)
        setVolume(Math.round(val/10))
    }

    const onProgress = ({played, playedSeconds, loadedSeconds}) => {
        if(loadedSeconds !== totalTime){
            setTotalTime(loadedSeconds)
        }

        let minutes = secondsToMinutes(playedSeconds)

        if(minutes!==time){
            setTime(minutes)
        }

        setPercent(played * 100)
    };

    const onEnded=()=>{
        valueRef.current.seekTo(0)
        setPlay(false)
    }

    return(
        <div className={styles.audioPlayerDiv}>
            <div className={styles.controls}>
                <div
                    className={styles.backwardDiv}
                    onClick={handleBackward}
                >
                    <i className={`fas fa-backward ${styles.forward}`}></i>
                </div>
                <PlayPause play={play} setPlay={setPlay} currentSong={currentSong}/>
                <div
                    className={styles.forwardDiv}
                    onClick={handleForward}
                >
                    <i className={`fas fa-forward ${styles.forward}`}></i>
                </div>
            </div>
            <div className={styles.waveform}>
                <ReactSlider
                    value={percent}
                    className='seekSlider'
                    thumbClassName='seekThumb'
                    trackClassName='seekTrack'
                    onChange={handleSeek}
                    step={.01}
                    orientation='horizontal'
                    renderThumb={(props, state) => <div {...props}>{time}</div>}
                />
                <div className={styles.volume}>
                    <ReactSlider
                        value={volPercent*100}
                        className='volSlider'
                        thumbClassName='volThumb'
                        trackClassName='volTrack'
                        onChange={handleVol}
                        step={.1}
                        min={0}
                        max={100}
                        orientation='vertical'
                        pearling
                        renderThumb={(props, state) => <div {...props}>{volume}</div>}
                        invert
                    />
                </div>
                <Mute mute={mute} setMute={setMute} currentSong={currentSong}/>
                <ReactPlayer
                    className={styles.player}
                    ref={valueRef}
                    playing={play}
                    width='100%'
                    volume={volPercent}
                    controls={false}
                    onProgress={onProgress}
                    onEnded={onEnded}
                    progressInterval={1}
                    url={currentSong?.url}
                    muted={mute}
                />
            </div>
            <div className={styles.songInfo}>
                <h2 className={styles.title}>{currentSong ? currentSong.title : null}</h2>
                <h3 className={styles.artist}>{currentSong ? currentSong.User.userName : null}</h3>
                <h3 className={styles.album}>{currentSong ? currentSong.album : null}</h3>
                <h3 className={styles.genre}>{currentSong ? currentSong.Genre.name : null}</h3>
            </div>
            <div className={styles.extras}>
                <div className={styles.likesDiv}>
                    <div className={styles.likesImg}>
                        <i className={`fas fa-heart ${styles.heart}`}></i>
                    </div>
                    <div className={styles.likes}>
                        Likes
                    </div>
                </div>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default AudioPlayer;