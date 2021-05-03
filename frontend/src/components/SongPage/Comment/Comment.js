/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import { deleteComment, editComment } from '../../../store/comments'
import styles from './Comment.module.css'


/*************************** HELPER FUNCTIONS ***************************/

function dateConverter(seqDate){
    if(!seqDate){return null}

    let date = new Date(seqDate)
    let now = new Date()

    let times=[1000,60,60,24,30,12]
    let string=[' seconds ago', ' minutes ago', ' hours ago', ' days ago', ' months ago', ' years ago']

    let difference = now-date

    for(let i=0;i<times.length-1;i++){
        difference/=times[i]
        if(difference<times[i+1]){
            return Math.round(difference) + string[i]
        }
    }
}

/*************************** COMPONENTS ***************************/


const EditSection=({newComment, setNewComment, editOn, comment})=>{
    if(editOn){
        return(
            <div className={styles.newCommentDiv}>
                <textarea
                    value={newComment}
                    className={styles.newComment}
                    onChange={(e)=>setNewComment(e.target.value)}
                ></textarea>
            </div>
        )
    } else {
        return(<h3>{comment?.comment}</h3>)
    }

}




const Comment = ({comment})=>{
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.session)

    const [newComment, setNewComment] = useState('')
    const [editOn, setEditOn] = useState(false)

    const handleEdit =(e)=>{
        if(editOn && newComment!==comment?.comment){
            dispatch(editComment(newComment, comment.id, comment.songId))
            setNewComment('')
            setEditOn(false)
        } else {
            setNewComment(comment?.comment)
            setEditOn(true)
        }
    }

    const handleDelete = ()=>{
        dispatch(deleteComment(comment.id, comment.songId))
    }

    return (
        <div className={styles.commentContainer}>
            <div className={styles.profPicDiv}>
                <img alt='' className={styles.profPic} src={comment?.User.profilePic ? comment.User.profilePic : `/img/Profile.png`}></img>
            </div>
            <div className={styles.userNameDiv}>
                <h3>{comment?.User?.userName}</h3>
            </div>
            <div className={styles.commentDiv}>
                <EditSection newComment={newComment} setNewComment={setNewComment} editOn={editOn} comment={comment} commentUserId={comment?.userId} userId={user?.id}/>
            </div>
            <div className={styles.dateDiv}>
                <h3>{dateConverter(comment?.createdAt)}</h3>
            </div>
            {(user && comment?.userId===user?.id) && <div className={styles.changeDiv}>
                <button className={styles.commentButton} onClick={handleEdit}>Edit</button>
                <button className={styles.commentButton} onClick={handleDelete}>Delete</button>
                {editOn && (
                    <>
                        <button className={styles.commentButton} onClick={()=>setEditOn(false)}>Cancel</button>
                        <div className={styles.commentButton}></div>
                    </>
                )}
            </div>}
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Comment;