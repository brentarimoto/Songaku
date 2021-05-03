/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

import {getSongs} from './songs'
import {loadPlaylists} from './playlists'


/*************************** HELPER FUNCTIONS ***************************/
import convertSongsToObject from '../utils/convertSongsToObject'

/*************************** TYPES ***************************/

const SET_ALBUMS = 'set/ALBUMS'
const EDIT_ALBUM = 'edit/ALBUM'
// const EDIT_PLAYLIST = 'edit/PLAYLIST'
// const REMOVE_ALBUM = 'remove/ALBUM '

// const ADD_TO_PLAYLIST = 'addTo/PLAYLIST'
// const REMOVE_FROM_PLAYLIST = 'removeFrom/PLAYLIST'



/*************************** ACTIONS ***************************/

export const setAlbums = (newState)=>{
    return {
        type: SET_ALBUMS,
        newState
    }
}

export const editAlbum = (album,userId)=>{
    return {
        type: EDIT_ALBUM,
        album,
        userId
    }
}
/*************************** THUNKS ***************************/

// Get songs
export const loadAlbums = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}/albums`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {albums} = await res.json();


    let newState = {[userId]:{}};

    albums?.forEach((album)=>{
        let songsObj = convertSongsToObject(album.Songs)
        newState[userId][album.id]={id:album.id, name:album.name, songs:songsObj};
    })

    dispatch(setAlbums(newState))

    return albums
}


// Uploads song to database, and adds it to store
export const changeAlbum = (name, id, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}/albums/${id}`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({name}),
    })

    if(!res.ok){
        const errors = await res.json()
        return errors
    }

    const {album} = await res.json();

    let songsObj=convertSongsToObject(album.Songs)

    let albumObj={[album.id]:{id:album.id, name: album.name, songs:songsObj}}

    dispatch(editAlbum(albumObj, userId))
    dispatch(getSongs(userId))
    dispatch(loadPlaylists(userId))

    return albumObj
}

/*************************** REDUCER ***************************/

export default function albumsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_ALBUMS:
            newState = {...state, ...action.newState}
            return newState
        case EDIT_ALBUM:
            newState = {...state}
            newState[action.userId]={...newState[action.userId], ...action.album}
            return newState
        default:
            return state
    }
}
