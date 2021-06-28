/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** HELPER FUNCTIONS ***************************/
import convertSongsToObject from '../utils/convertSongsToObject'

/*************************** TYPES ***************************/

const SET_TOP_SONGS = 'set/TOPSONGS'

/*************************** ACTIONS ***************************/

export const setTopSongs = (songs, genreId)=>{
    return {
        type: SET_TOP_SONGS,
        songs,
        genreId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const getTopSongs = (genreId)=> async dispatch=>{
    const res = await csrfFetch(`/api/songs/suggestions/likes/songs`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({type: 'genreId', value: genreId}),
    })


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {topSongs} = await res.json();

    const songsObj = convertSongsToObject(topSongs)

    dispatch(setTopSongs(songsObj, genreId))

    return topSongs
}

// Get top Likes
export const getTopLikes = ()=> async dispatch=>{
    const res = await csrfFetch(`/api/songs/suggestions/likes`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {topSongs} = await res.json();

    const songsObj = convertSongsToObject(topSongs)

    dispatch(setTopSongs(songsObj, 'likes'))

    return topSongs
}

/*************************** REDUCER ***************************/

export default function topSongsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_TOP_SONGS:
            newState = {...state}
            newState[action.genreId] = {...action.songs}
            return newState
        default:
            return state
    }
}
