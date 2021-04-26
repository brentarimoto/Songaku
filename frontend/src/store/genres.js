/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/
const SET_GENRES = 'set/GENRES'

/*************************** ACTIONS ***************************/
export const setGenres = (genres)=>{
    return {
        type: SET_GENRES,
        genres
    }
}

/*************************** THUNKS ***************************/

export const restoreGenres = () => async dispatch => {

    const res = await csrfFetch('/api/genres')


    const {genres} = await res.json();


    const genreList = genres.map(genre=>genre.name)

    if(genres.length){
        dispatch(setGenres(genreList))
    }

    return genres
}


/*************************** REDUCER ***************************/

export default function songReducer(state = [], action){
    switch(action.type){
        case SET_GENRES:
            return [...action.genres]
        default:
            return state
    }
}
