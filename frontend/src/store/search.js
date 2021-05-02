/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';
/*************************** HELPER FUNCTIONS ***************************/
import convertSongsToObject from '../utils/convertSongsToObject'

/*************************** TYPES ***************************/

const SET_SEARCH_SONGS = 'set/SEARCHSONGS'


/*************************** ACTIONS ***************************/

export const setSearchSongs = (songs)=>{
    return {
        type: SET_SEARCH_SONGS,
        songs
    }
}
/*************************** THUNKS ***************************/

export const searchSongs = (string)=> async dispatch=>{
    const res = await csrfFetch(`/api/songs/search`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({string}),
    })

    const {songs} = await res.json();

    const songsObj = convertSongsToObject(songs)
    console.log('test')

    dispatch(setSearchSongs(songsObj))

    return songs
}



/*************************** REDUCER ***************************/

export default function searchReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_SEARCH_SONGS:
            newState = {...action.songs}
            return newState
        default:
            return state
    }
}
