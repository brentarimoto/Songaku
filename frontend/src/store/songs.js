/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_SONG = 'set/SONG'
const SET_SONGS = 'set/SONGS'
const ADD_SONG = 'add/SONG'
const REMOVE_SONG = 'remove/SONG'

/*************************** ACTIONS ***************************/

export const setSongs = (songs, userId)=>{
    return {
        type: SET_SONGS,
        songs,
        userId
    }
}

export const addSong = (song, userId)=>{
    return {
        type: ADD_SONG,
        song,
        userId
    }
}

export const removeSong = (id, userId)=>{
    return {
        type: REMOVE_SONG,
        id,
        userId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const getSongs = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}/songs`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {songs} = await res.json();

    let songsObj = {};

    songs.forEach((song)=>{
        songsObj[song.id]=song
    })

    dispatch(setSongs(songsObj, userId))
    return songs
}


// Uploads song to database, and adds it to store
export const uploadSong = ({title, userId, album, music, image, genreId}) => async dispatch => {
    const files = [music, image]

    const formData = new FormData();
    formData.append('title', title)
    formData.append('userId', userId)
    formData.append('album', album)
    formData.append('genreId', genreId)

    if (files && files.length!==0){
        files.forEach((file)=>{
            formData.append("files", file)
        })
    }

    const res = await csrfFetch('/api/songs',{
        method: 'POST',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        body: formData,
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {song, reload} = await res.json();

    dispatch(addSong(song, userId))

    if(reload){await dispatch(getSongs(userId))}

    return {song}
}

export const editSong = ({title, userId, album, music, image, genreId, songId}) => async dispatch => {
    const files = [music, image]

    const formData = new FormData();
    formData.append('title', title)
    formData.append('userId', userId)
    formData.append('album', album)
    formData.append('genreId', genreId)

    if (files && files.length!==0){
        files.forEach((file)=>{
            formData.append("files", file)
        })
    }

    const res = await csrfFetch(`/api/songs/${songId}`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        body: formData,
    })


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {song, reload} = await res.json();

    dispatch(addSong(song, userId))
    return {song, reload}
}



// Delete Song in database, and then delete from store
export const deleteSong = (id, userId, albumId) => async dispatch => {

    const res = await csrfFetch(`/api/songs/${id}`,{
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({albumId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {message} = await res.json();

    if(message==='success'){
        dispatch(removeSong(id, userId))
    }

    return message
}


/*************************** REDUCER ***************************/

export default function songsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_SONG:
            newState = {...state}
            newState[action.userId][action.song.id] = {...action.song}
            return newState
        case SET_SONGS:
            newState = {...state}
            newState[action.userId] = {...action.songs}
            return newState
        case ADD_SONG:
            newState = {...state}
            newState[action.userId] = {...newState[action.userId]}
            newState[action.userId][action.song.id] = {...action.song}
            return newState
        case REMOVE_SONG:
            newState={...state}
            delete newState[action.userId][action.id]
            return newState
        default:
            return state
    }
}
