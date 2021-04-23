/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/
const SET_USER = 'set/USER'

const REMOVE_USER = 'delete/USER'

/*************************** ACTIONS ***************************/
export const setUser = (user)=>{
    return {
        type: SET_USER,
        user
    }
}

export const removeUser = (user)=>{
    return {
        type: REMOVE_USER,
        user
    }
}

/*************************** THUNKS ***************************/
// Restore User in Store after refresh based off the token in the cookies
export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session')

    const {user} = await res.json()

    if(user){
        dispatch(setUser(user))
    }
    return user
}

// Login User and set User in Store
export const login = ({credential, password}) => async dispatch => {
    const res = await csrfFetch('/api/session',{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({credential, password})
    })

    if(!res.ok){
        const error = await res.json()
        return error
    }

    const {user} = await res.json();
    dispatch(setUser(user))
    return user
}

// Adds User to database, and set User in Store
export const signup = ({email, username, password}) => async dispatch => {
    const res = await csrfFetch('/api/users',{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({email, username, password})
    })

    if(!res.ok){
        const error = await res.json()
        return error
    }

    const {user} = await res.json();
    dispatch(setUser(user))
    return user
}

// Logs out user by removing token from cookies, and removing user from Store
export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session',{
        method: 'DELETE'
    })

    if(!res.ok){
        const error = await res.json()
        return error
    }

    const {success} = await res.json();
    dispatch(removeUser())
    return success
}



/*************************** REDUCER ***************************/
const initialState = { user: null };

export default function sessionReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state
    }
}
