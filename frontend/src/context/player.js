import { createContext, useContext, useState } from 'react';

export const PlayerContext = createContext()

export const usePlayerContext = () => useContext(PlayerContext)

function secondsToMinutes(seconds){
    let temp = ((seconds/60).toFixed(4)).split('.')
    temp[1]=(Math.round(parseFloat('.'+temp[1])*60))
    if(temp[1].toString().length<=1){temp[1]='0'+temp[1]}
    return temp.join(':')
}

export default function PlayerProvider({children}){

    const [play, setPlay] = useState(false)
    const [time, setTime] = useState(secondsToMinutes(0))
    const [totalTime, setTotalTime] = useState(0)
    const [percent, setPercent] = useState(0)
    const [volPercent, setVolPercent] = useState(1)
    const [volume, setVolume] = useState(10)
    const [mute, setMute] = useState(false)

    const obj ={
        play, setPlay,
        time, setTime,
        totalTime, setTotalTime,
        percent, setPercent,
        volPercent, setVolPercent,
        volume, setVolume,
        mute, setMute
    }

    return (
        <PlayerContext.Provider value={obj}>
            {children}
        </PlayerContext.Provider>
    )
}