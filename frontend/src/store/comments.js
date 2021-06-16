/*************************** OTHER FILE IMPORTS ***************************/
import { csrfFetch } from './csrf';

/*************************** TYPES ***************************/

const SET_COMMENTS = 'set/COMMENTS'
const ADD_COMMENT = 'add/COMMENT'
const REMOVE_COMMENT = 'remove/COMMENT'

/*************************** ACTIONS ***************************/

export const setComments = (comments, songId)=>{
    return {
        type: SET_COMMENTS,
        comments,
        songId
    }
}

export const addComment = (comment, songId)=>{
    return {
        type: ADD_COMMENT,
        comment,
        songId
    }
}

export const removeComment= (id, songId)=>{
    return {
        type: REMOVE_COMMENT,
        id,
        songId
    }
}

/*************************** THUNKS ***************************/

// Get songs
export const loadComments = (songId)=> async dispatch=>{
    const res = await csrfFetch(`/api/songs/${songId}/comments`)


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {comments} = await res.json();

    let commentsObj = {};

    comments.forEach((comment)=>{
        commentsObj[comment.id]=comment
    })

    dispatch(setComments(commentsObj, songId))

    return comments
}


// Uploads song to database, and adds it to store
export const postComment = (comment, userId, songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`,{
        method: 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({comment, userId}),
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {newComment} = await res.json();

    dispatch(addComment(newComment, songId))
    return newComment
}

export const editComment = (comment, id, songId) => async dispatch => {
    const res = await csrfFetch(`/api/songs/${songId}/comments/${id}`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({comment}),
    })


    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {existingComment} = await res.json();

    dispatch(addComment(existingComment, songId))
    return {existingComment}
}



// Delete Song in database, and then delete from store
export const deleteComment = (id, songId) => async dispatch => {

    const res = await csrfFetch(`/api/songs/${songId}/comments/${id}`,{
        method: 'DELETE'
    })

    if(!res.ok){
        const errors = await res.json()
        return {errors}
    }

    const {message} = await res.json();

    if(message==='success'){
        dispatch(removeComment(id, songId))
    }

    return message
}


/*************************** REDUCER ***************************/

export default function commentsReducer(state = {}, action){
    let newState;
    switch(action.type){
        case SET_COMMENTS:
            newState = {...state}
            newState[action.songId] = {...action.comments}
            return newState
        case ADD_COMMENT:
            newState = {...state}
            if(newState[action.songId]){
                newState[action.songId][action.comment.id] = {...action.comment}
            } else {
                newState[action.songId]={}
                newState[action.songId][action.comment.id]={...action.comment}
            }
            return newState
        case REMOVE_COMMENT:
            newState={...state}
            delete newState[action.songId][action.id]
            return newState
        default:
            return state
    }
}
