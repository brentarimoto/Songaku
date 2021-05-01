/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_PLAYLISTS = 'set/PLAYLISTS'
const ADD_PLAYLIST = 'add/PLAYLIST'
const EDIT_PLAYLIST = 'edit/PLAYLIST'
const REMOVE_PLAYLIST = 'remove/PLAYLIST '

const ADD_TO_PLAYLIST = 'addTo/PLAYLIST'
const REMOVE_FROM_PLAYLIST = 'removeFrom/PLAYLIST'



/*************************** ACTIONS ***************************/

export const setPlaylists = (playlists)=>{
    return {
        type: SET_PLAYLISTS,
        playlists
    }
}

export const addPlaylist = (playlist,userId)=>{
    return {
        type: ADD_PLAYLIST,
        playlist,
        userId
    }
}

export const editPlaylist = (playlist,userId)=>{
    return {
        type: EDIT_PLAYLIST,
        playlist,
        userId
    }
}

export const removePlaylist= (id,userId)=>{
    return {
        type: REMOVE_PLAYLIST,
        id,
        userId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const loadPlaylists = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}/playlists`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {playlists} = await res.json();

    let playlistObj = {[userId]:{}};

    playlists.forEach((playlist)=>{
        let tempObj={}
        playlist.SongsInPlaylist.forEach((song)=>{
            tempObj[song.id]=song
        })
        playlistObj[userId][playlist.id]={id:playlist.id, name:playlist.name, songs:tempObj};
    })

    dispatch(setPlaylists(playlistObj))

    return playlists
}


// Uploads song to database, and adds it to store
export const createPlaylist = (name, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/playlists`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name}),
    })

    if(!res.ok){
        const errors = await res.json()
        return errors
    }

    const {playlist} = await res.json();

    dispatch(addPlaylist(playlist, userId))
    return playlist
}

export const changePlaylist = (name, id, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/${id}`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name}),
    })


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {existingPlaylist} = await res.json();

    let playlistObj = {};

    let tempObj={}
    existingPlaylist.SongsInPlaylist.forEach((song)=>{
        tempObj[song.id]=song
    })

    playlistObj[existingPlaylist.id]={id:existingPlaylist.id, name:existingPlaylist.name, songs:tempObj};

    dispatch(editPlaylist(playlistObj, userId))

    return {existingPlaylist}
}



// Delete Song in database, and then delete from store
export const deletePlaylist = (id, userId) => async dispatch => {

    const res = await csrfFetch(`/api/users/${userId}/comments/${id}`,{
        method: 'DELETE'
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {message} = await res.json();

    if(message==='success'){
        dispatch(removePlaylist(id, userId))
    }

    return message
}


/*************************** REDUCER ***************************/

export default function playlistsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_PLAYLISTS:
            newState = {...action.playlists}
            return newState
        case ADD_PLAYLIST:
            newState = {...state}
            newState[action.userId][action.playlist.id]={id:action.playlist.id, name:action.playlist.name, songs:{}}
            return newState
        case EDIT_PLAYLIST:
            newState = {...state}
            newState[action.userId]={...newState[action.userId], ...action.playlist}
            return newState
        case REMOVE_PLAYLIST:
            newState={...state}
            delete newState[action.userId][action.id]
            return newState
        default:
            return state
    }
}
