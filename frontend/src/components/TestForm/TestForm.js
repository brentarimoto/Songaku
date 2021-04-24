/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {upload} from '../../store/songs';

import styles from './LoginForm.module.css'


/*************************** COMPONENTS ***************************/
const TestForm = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);


    const [title, setTitle] = useState('song1')
    const [album, setAlbum] = useState('album')
    const [music, setMusic] = useState('1')
    const [genreId, setGenreId] = useState(1)

    const [errors, setErrors] = useState([])


    const handleSubmit= async (e)=>{
        e.preventDefault();
        const song = {
            title,
            userId:user.id,
            album,
            music,
            genreId
        }


        let addedSong = await dispatch(upload(song))

        if (addedSong.id) {
            console.log(addedSong)
        } else {
            console.log(addedSong)
        }
    }

    return(
        <form className={styles.formDiv}
            onSubmit={handleSubmit}
        >
            <button className={styles.button} type='submit'>Test</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default TestForm;