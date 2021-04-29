/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider'

/*************************** OTHER FILE IMPORTS ***************************/

import styles from './Comment.module.css'

/*************************** COMPONENTS ***************************/
const DeleteComment = ({commentId, userId})=>{
    return (
        <button className={styles.deleteButton}>Delete</button>
    )
}

/*************************** EXPORT ***************************/
export default DeleteComment;