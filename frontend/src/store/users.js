/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_USER = 'set/USER'

/*************************** ACTIONS ***************************/

export const setUser = (user)=>{
    return {
        type: SET_USER,
        user
    }
}

/*************************** THUNKS ***************************/

// Get user
export const getUser = (userId)=> async dispatch=>{
    const res = await csrfFetch(`/api/users/${userId}`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {user} = await res.json();

    let userObj = {[user.id]:user};

    dispatch(setUser(userObj, userId))

    return user
}

/*************************** REDUCER ***************************/

export default function songsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_USER:
            newState = {...state, ...action.user}
            return newState
        default:
            return state
    }
}
