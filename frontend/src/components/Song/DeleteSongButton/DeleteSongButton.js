/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {deleteSong} from '../../../store/songs';

import styles from './DeleteSongButton.module.css'


/*************************** COMPONENTS ***************************/
const DeleteSongButton = ({id})=>{
    const dispatch = useDispatch();
    const history= useHistory();

    const {user} = useSelector(state => state.session);

    const handleDelete= async (e)=>{
        e.preventDefault();

        let message = await dispatch(deleteSong(id, user.id))

        if(message!=='success'){
            console.log(message)
        }
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