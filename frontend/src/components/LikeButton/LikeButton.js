/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {postLike, deleteLike} from '../../store/likes'
import styles from './LikeButton.module.css'

/*************************** HELPER FUNCTION ***************************/
function isLiked(likes, songId, user){

    if(!songId || !likes[songId] || !user){
        return false
    }

    if(likes[songId].users[user.id]){
        return true
    }

    return false

}

/*************************** COMPONENTS ***************************/
const LikeButton = ({songId})=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.session);
    const likes = useSelector(state => state.likes);

    const [liked, setLiked] = useState(false)

    useEffect(()=>{
        setLiked(isLiked(likes, songId, user))
    },[likes])

    const handleLike= async (e)=>{
        if(liked){
            dispatch(deleteLike(user.id, songId))
        } else {
            dispatch(postLike(user.id, songId))
        }
    }

    return(
        <div className={styles.likeButtonDiv}>
            <button className={styles.button} onClick={handleLike}>
                {liked ?
                    <i className={`fas fa-heart ${styles.heartFull}`}></i> :
                    <i className={`far fa-heart ${styles.heart}`}></i>
                }
            </button>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default LikeButton;