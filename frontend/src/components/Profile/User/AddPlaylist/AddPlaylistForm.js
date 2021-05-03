/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import {createPlaylist} from '../../../../store/playlists'

import styles from './AddPlaylistForm.module.css'


/*************************** COMPONENTS ***************************/
const AddPlaylistForm = ({onClose})=>{
    const dispatch = useDispatch();

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
            <div className={styles.playlistInputDiv}>
                <label className= {styles.playlistNameLabel} htmlFor='playlistName'>Playlist Name: </label>
                <input className={styles.playlistName} name='playlistName' onChange={(e)=>setName(e.target.value)} value={name} autoComplete='off'></input>
            </div>
            <button className={styles.button} type='submit'>Create</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default AddPlaylistForm;