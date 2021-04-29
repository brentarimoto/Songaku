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
    console.log('test1')
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

export const editComment = ({title, userId, album, music, image, genreId, songId}) => async dispatch => {
    // const files = [music, image]

    // const formData = new FormData();
    // formData.append('title', title)
    // formData.append('userId', userId)
    // formData.append('album', album)
    // formData.append('genreId', genreId)

    // if (files && files.length!==0){
    //     files.forEach((file)=>{
    //         formData.append("files", file)
    //     })
    // }

    // const res = await csrfFetch(`/api/songs/${songId}`,{
    //     method: 'PUT',
    //     headers : {
    //         'Content-Type' : 'multipart/form-data'
    //     },
    //     body: formData,
    // })


    // if(!res.ok){
    //     const errors = await res.json()
    //     return {errors}
    // }

    // const {song, reload} = await res.json();

    // dispatch(addSong(song, userId))
    // return {song, reload}
}



// Delete Song in database, and then delete from store
export const deleteComment = (id, userId) => async dispatch => {

    // const res = await csrfFetch(`/api/songs/${id}`,{
    //     method: 'DELETE',
    // })

    // if(!res.ok){
    //     const errors = await res.json()
    //     return {errors}
    // }

    // const {message} = await res.json();

    // if(message==='success'){
    //     dispatch(removeSong(id, userId))
    // }

    // return message
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
            // delete newState[action.userId][action.id]
            return newState
        default:
            return state
    }
}
