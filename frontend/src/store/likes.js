/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_LIKES = 'set/LIKES'
const ADD_LIKE = 'add/LIKES'
const REMOVE_LIKE = 'remove/LIKES'

/*************************** ACTIONS ***************************/

export const setLikes = (likes, songId)=>{
    return {
        type: SET_LIKES,
        likes
    }
}

export const addLike = (createdAt, userId, songId)=>{
    return {
        type: ADD_LIKE,
        createdAt,
        userId,
        songId
    }
}

export const removeLike= (userId, songId)=>{
    return {
        type: REMOVE_LIKE,
        userId,
        songId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const loadLikes = (songId)=> async dispatch=>{
    if(!songId){return}

    const res = await csrfFetch(`/api/songs/${songId}/likes`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {likes} = await res.json();

    let likesObj={}
    likesObj[songId]={count:likes.length, users:{}};

    console.log(likes)


    likes.forEach((like)=>{
        likesObj[songId].users[like.userId]=like.createdAt
    })

    dispatch(setLikes(likesObj))

    return likes.length
}


// Uploads song to database, and adds it to store
export const postLike = (userId, songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}/likes`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({userId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {createdAt} = await res.json();

    dispatch(addLike(createdAt, userId, songId))

    return createdAt
}


// Delete Song in database, and then delete from store
export const deleteLike = (userId, songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}/likes`,{
        method: 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({userId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    let {message} = await res.json();

    if(message==='success'){
        dispatch(removeLike(userId, songId))
    } else {
        message='failed'
    }

    return message
}


/*************************** REDUCER ***************************/

export default function likesReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_LIKES:
            newState = {...state, ...action.likes}
            return newState
        case ADD_LIKE:
            newState = {...state}
            if(newState[action.songId]){
                newState[action.songId].count+=1
                newState[action.songId].users[action.userId]=action.createdAt
            } else{
                newState[action.songId] = {count:1}
                newState[action.songId].users={}
                newState[action.songId].users[action.userId]=action.createdAt
            }
            return newState
        case REMOVE_LIKE:
            newState={...state}
            newState[action.songId].count-=1
            delete newState[action.songId].users[action.userId]
            return newState
        default:
            return state
    }
}
