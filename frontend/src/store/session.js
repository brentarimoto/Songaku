import { csrfFetch } from './csrf';

const SET_USER = 'set/USER'
const DELETE_USER = 'delete/USER'

export const setUser = (user)=>{
    return {
        type: SET_USER,
        user
    }
}

export const deleteUser = (user)=>{
    return {
        type: DELETE_USER,
        user
    }
}

export const login = ({credential, password}) => async dispatch => {
    const res = await csrfFetch('/api/session',{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({credential, password})
    })

    if(res.ok){
        const user = await res.json();
        dispatch(setUser(user.user))
        return res
    }
}

const initialState = { user: null };

export default function sessionReducer(state = initialState, action){
    let newState;
    switch(action.type){
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            return newState
        case DELETE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state
    }
}
