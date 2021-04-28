/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_SONG = 'set/CURRENTSONG'

/*************************** ACTIONS ***************************/
export const setSong = (song)=>{
    return {
        type: SET_SONG,
        song
    }
}

/*************************** REDUCER ***************************/

export default function songsReducer(state = null, action){
    console.log(action)
    switch(action.type){
        case SET_SONG:
            return {...action.song}
        default:
            return state
    }
}
