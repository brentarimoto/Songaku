/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/
const ADD_SONG = 'add/SONG'

/*************************** ACTIONS ***************************/
export const addSong = (song)=>{
    return {
        type: ADD_SONG,
        song
    }
}

/*************************** THUNKS ***************************/
// Uploads song to database, and adds it to usersongs
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
        const error = await res.json()
        return error.message
    }

    const {song} = await res.json();
    console.log(song)
    dispatch(addSong(song))
    return song
}

export const deleteSong = (id) => async dispatch => {

    const res = await csrfFetch(`/api/songs/${id}`,{
        method: 'DELETE',
    })

    const {message} = await res.json();
    return message
}


/*************************** REDUCER ***************************/

export default function mySongsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case ADD_SONG:
            newState = {...state}
            newState[action.song.id] = action.song
            return newState
        default:
            return state
    }
}
