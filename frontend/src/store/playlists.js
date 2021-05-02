/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** HELPER FUNCTIONS ***************************/
import convertSongsToObject from '../utils/convertSongsToObject'

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

export const addToPlaylist = (song, id, userId)=>{
    return {
        type: ADD_TO_PLAYLIST,
        song,
        id,
        userId
    }
}

export const removeFromPlaylist = (songId, id, userId)=>{
    return {
        type: REMOVE_FROM_PLAYLIST,
        songId,
        id,
        userId
    }
}


/*************************** THUNKS ***************************/

// Get playlists
export const loadPlaylists = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}/playlists`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {playlists} = await res.json();

    let playlistObj = {[userId]:{}};

    playlists.forEach((playlist)=>{
        let songsObj=convertSongsToObject(playlist.SongsInPlaylist)

        playlistObj[userId][playlist.id]={id:playlist.id, name:playlist.name, songs:songsObj};
    })

    dispatch(setPlaylists(playlistObj))

    return playlists
}


// Creates Playlist in database, and adds it to store
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

// Edit Playlist
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

    let songsObj=convertSongsToObject(existingPlaylist.SongsInPlaylist)

    playlistObj[existingPlaylist.id]={id:existingPlaylist.id, name:existingPlaylist.name, songs:songsObj};

    dispatch(editPlaylist(playlistObj, userId))

    return {existingPlaylist}
}



// Delete playlist in database, and then delete from store
export const deletePlaylist = (id, userId) => async dispatch => {

    const res = await csrfFetch(`/api/users/${userId}/playlists/${id}`,{
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

// Adds song to playlist (adds to PlaylistSong table) and adds song to correct playlist store
export const addSongPlaylist = (id, songId, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/${id}/song`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({songId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return errors
    }

    const {song} = await res.json();

    const songObj={[song.id]:song}

    dispatch(addToPlaylist(songObj, id, userId))

    return song
}

// Removes song to playlist (deletes from PlaylistSong table) and removes song from correct playlist store
export const deleteSongPlaylist = (id, songId, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/${id}/song`,{
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({songId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return errors
    }

    dispatch(removeFromPlaylist(songId, id, userId))

    return 'success'
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
        case ADD_TO_PLAYLIST:
            newState={...state}
            newState[action.userId][action.id].songs={...newState[action.userId][action.id].songs, ...action.song}
            return newState
        case REMOVE_FROM_PLAYLIST:
            newState={...state}
            delete newState[action.userId][action.id].songs[action.songId]
            return newState
        default:
            return state
    }
}
