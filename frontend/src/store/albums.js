/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

function convertToObject(songs){
    let albumObj={}

    songs.forEach((song)=>{

        if(albumObj[song.album]){
            albumObj[song.album][song.id]=song
        } else{
            albumObj[song.album]={[song.id]:song}
        }
    })

    return albumObj
}

/*************************** TYPES ***************************/

const SET_ALBUMS = 'set/ALBUMS'
const ADD_ALBUM = 'add/ALBUM'
// const EDIT_PLAYLIST = 'edit/PLAYLIST'
const REMOVE_ALBUM = 'remove/ALBUM '

// const ADD_TO_PLAYLIST = 'addTo/PLAYLIST'
// const REMOVE_FROM_PLAYLIST = 'removeFrom/PLAYLIST'



/*************************** ACTIONS ***************************/

export const setAlbums = (newState)=>{
    return {
        type: SET_ALBUMS,
        newState
    }
}

export const addAlbum = (prev, name,userId)=>{
    return {
        type: ADD_ALBUM,
        prev,
        name,
        userId
    }
}

// export const editPlaylist = (playlist,userId)=>{
//     return {
//         type: EDIT_PLAYLIST,
//         playlist,
//         userId
//     }
// }

export const removeAlbum= (name,userId)=>{
    return {
        type: REMOVE_ALBUM,
        name,
        userId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const loadAlbums = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}/songs`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {songs} = await res.json();

    let albumObj=convertToObject(songs)

    let newState = {[userId]:albumObj};

    dispatch(setAlbums(newState))

    return songs
}


// Uploads song to database, and adds it to store
export const changeAlbum = (prev, name, userId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/albums`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({prev, name}),
    })

    if(!res.ok){
        const errors = await res.json()
        return errors
    }

    const {songs} = await res.json();

    let albumObj=convertToObject(songs)

    dispatch(removeAlbum(prev, userId))
    dispatch(addAlbum(albumObj, userId))

    return albumObj
}

export const changePlaylist = (name, id, userId) => async dispatch => {
    // const res = await csrfFetch(`/api/users/${userId}/playlists/${id}`,{
    //     method: 'PUT',
    //     headers : {
    //         'Content-Type' : 'application/json'
    //     },
    //     body: JSON.stringify({name}),
    // })


    // if(!res.ok){
    //     const errors = await res.json()
    //     return {errors}
    // }

    // const {existingPlaylist} = await res.json();

    // let playlistObj = {};

    // let tempObj={}
    // existingPlaylist.SongsInPlaylist.forEach((song)=>{
    //     tempObj[song.id]=song
    // })

    // playlistObj[existingPlaylist.id]={id:existingPlaylist.id, name:existingPlaylist.name, songs:tempObj};

    // dispatch(editPlaylist(playlistObj, userId))

    // return {existingPlaylist}
}



// Delete Song in database, and then delete from store
export const deletePlaylist = (id, userId) => async dispatch => {

    // const res = await csrfFetch(`/api/users/${userId}/comments/${id}`,{
    //     method: 'DELETE'
    // })

    // if(!res.ok){
    //     const errors = await res.json()
    //     return {errors}
    // }

    // const {message} = await res.json();

    // if(message==='success'){
    //     dispatch(removePlaylist(id, userId))
    // }

    // return message
}


/*************************** REDUCER ***************************/

export default function albumsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_ALBUMS:
            newState = {...action.newState}
            return newState
        case ADD_ALBUM:
            newState = {...state}
            newState[action.userId]={...newState[action.userId], ...action.album}
            return newState
        // case EDIT_PLAYLIST:
        //     newState = {...state}
        //     // newState[action.userId]={...newState[action.userId], ...action.playlist}
        //     return newState
        case REMOVE_ALBUM:
            newState={...state}
            delete newState[action.userId][action.name]
            return newState
        default:
            return state
    }
}
