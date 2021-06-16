/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {deletePlaylist} from '../../../../../store/playlists';

import styles from './DeletePlaylistButton.module.css'


/*************************** COMPONENTS ***************************/
const DeletePlaylistButton = ({name, id})=>{
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    const handleDeletePlaylist= async (e)=>{
        e.preventDefault();

        let {message, errors} = await dispatch(deletePlaylist(id, user.id))

        if(errors){setErrors(errors.errors)}

        if(message!=='success'){
            // console.log(message)
        }
    }

    return(
        <div className={styles.form}>
            <ul className={styles.formErrors}>
                {errors.length>0 && errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <div className={styles.headers}>
                <h4>Are you sure?</h4>
                <h4>"{name}" will be permanently deleted. </h4>
            </div>
            <button className={styles.button} type='submit' onClick={handleDeletePlaylist}>Delete</button>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default DeletePlaylistButton;