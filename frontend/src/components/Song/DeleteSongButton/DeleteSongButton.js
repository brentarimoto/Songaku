/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {deleteSong} from '../../../store/songs';

import styles from './DeleteSongButton.module.css'


/*************************** COMPONENTS ***************************/
const DeleteSongButton = ({id, albumId})=>{
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    const handleDelete= async (e)=>{
        e.preventDefault();

        let {errors} = await dispatch(deleteSong(id, user.id, albumId))

        if(errors){setErrors(errors?.errors || [errors.message])}
    }

    return(
        <form className={styles.form}
            onSubmit={handleDelete}
        >
            <ul className={styles.formErrors}>
                {errors.length>0 && errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <div className={styles.headers}>
                <h4>Are you sure?</h4>
                <h4>Files will be permanently deleted. </h4>
            </div>
            <button className={styles.button} type='submit'>Delete</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default DeleteSongButton;