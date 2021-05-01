/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import {createPlaylist} from '../../../../store/playlists'

import styles from './AddPlaylistForm.module.css'


/*************************** COMPONENTS ***************************/
const AddPlaylistForm = ({onClose})=>{
    const dispatch = useDispatch();
    const history= useHistory();

    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    const handleCreatePlaylist= async (e)=>{
        e.preventDefault();
        let res = dispatch(createPlaylist(name, user.id))

        if(res?.errors){
            setErrors(res.errors)
            return
        }

        onClose()
    }

    return(
        <form className={styles.form}
            onSubmit={handleCreatePlaylist}
        >
            <ul className={styles.formErrors}>
                {errors.length>0 && errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <label className= {styles.playlistNameLabel} htmlFor='playlistName'>Playlist Name: </label>
            <input className={styles.playlistName} name='playlistName' onChange={(e)=>setName(e.target.value)} value={name}></input>
            <button className={styles.button} type='submit'>Create</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default AddPlaylistForm;