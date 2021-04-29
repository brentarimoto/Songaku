/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider'

/*************************** OTHER FILE IMPORTS ***************************/
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
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
const Comment = ({comment, isLoaded})=>{
    const {user} = useSelector((state)=>state.session)
    console.log(comment?.userId===user?.id)

    return (
        <div className={styles.commentContainer}>
            <div className={styles.profPicDiv}>
                <img className={styles.profPic} src={comment?.User.profilePic ? comment.User.profilePic : `/img/Profile.png`}></img>
            </div>
            <div className={styles.userNameDiv}>
                <h3>{comment?.User?.userName}</h3>
            </div>
            <div className={styles.commentDiv}>
                <h3>{comment?.comment}</h3>
            </div>
            <div className={styles.dateDiv}>
                <h3>{dateConverter(comment?.createdAt)}</h3>
            </div>
            {(user && comment?.userId===user?.id) && <div className={styles.changeDiv}>
                <EditButton comment={comment} userId={user.id}/>
                <DeleteButton comment={comment} userId={user.id}/>
            </div>}
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Comment;