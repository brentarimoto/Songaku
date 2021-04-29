/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ReactSlider from 'react-slider'

/*************************** OTHER FILE IMPORTS ***************************/

import styles from './Comment.module.css'

/*************************** COMPONENTS ***************************/
const EditButton = ({commentId, userId})=>{
    return (
        <button className={styles.deleteButton}>Edit</button>
    )
}

/*************************** EXPORT ***************************/
export default EditButton;