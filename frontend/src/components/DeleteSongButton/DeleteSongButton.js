/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {deleteSong} from '../../store/mySongs';

import styles from './DeleteSongButton.module.css'


/*************************** COMPONENTS ***************************/
const DeleteSongButton = ()=>{
    const dispatch = useDispatch();

    const handleDelete= async (e)=>{
        e.preventDefault();

        let id=3;

        let res = await dispatch(deleteSong(id))

        console.log(res.message)
    }

    return(
        <form className={styles.form}
            onSubmit={handleDelete}
        >
            <button className={styles.button} type='submit'>Delete</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default DeleteSongButton;