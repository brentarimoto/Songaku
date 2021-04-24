/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/
const ADD_SONG = 'add/SONG'

/*************************** ACTIONS ***************************/
export const addSong = (user)=>{
    return {
        type: ADD_SONG,
        user
    }
}

/*************************** THUNKS ***************************/
// Login User and set User in Store
export const upload = ({title, userId, album, music, genreId}) => async dispatch => {
    const res = await csrfFetch('/api/songs',{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({title, userId, album, music, genreId})
    })

    if(!res.ok){
        const error = await res.json()
        return error.message
    }

    const {song} = await res.json();
    dispatch(addSong(song))
    return song
}


/*************************** REDUCER ***************************/

export default function songReducer(state = {}, action){
    let newState;
    switch(action.type){
        // case ADD_SONG:
        //     newState = {...state}
        //     newState[action.song.id] = action.song
        //     return newState
        default:
            return state
    }
}
