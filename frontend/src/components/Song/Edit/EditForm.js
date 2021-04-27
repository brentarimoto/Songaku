/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {login} from '../../../store/session';

import styles from './EditForm.module.css'


/*************************** COMPONENTS ***************************/
const EditForm = ({song})=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);

    const [title, setTitle] = useState(song?.title)
    const [album, setAlbum] = useState(song?.album)
    const [genreId, setGenreId] = useState(song?.genreId)
    const [errors, setErrors] = useState([])

    const handleGenre = (e)=>{
        const genreId = Object.keys(genres).find(key => genres[key] === e.target.value);
        setGenreId(genreId)
    }

    const handleUpload= async (e)=>{
        e.preventDefault();

        const song = {
            title,
            userId: user.id,
            album,
            genreId
        }

        // let editedSong = await dispatch(editSong(song))

    }


    return(
        <div className={styles.formDiv}>
            <ul className={styles.formErrors}>
                {errors?.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form
                className={styles.form}
                onSubmit = { handleUpload }
            >
                <div className={styles.title}>
                    <label className= {[styles.label, styles.titleLabel]} htmlFor='title'>Title: </label>
                    <input
                        className={[styles.input, styles.titleInput]}
                        name='title'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    ></input>
                </div>
                <div className={styles.album}>
                    <label className= {[styles.label, styles.albumLabel]} htmlFor='album'>Album: </label>
                    <input
                        className={[styles.input, styles.albumInput]}
                        name='album'
                        type='text'
                        placeholder='Album'
                        value={album}
                        onChange={(e)=>setAlbum(e.target.value)}
                    ></input>
                </div>
                <div className={styles.genre}>
                    <label className= {[styles.label, styles.genreLabel]} htmlFor='genre'>Genre: </label>
                    <select
                        className={[styles.input, styles.genreInput]}
                        name='genre'
                        onChange={handleGenre}
                    >
                        {Object.entries(genres).map(genre=>(
                            <option key={genre[1]}>{genre[1]}</option>
                        ))}
                    </select>
                </div>
                <button className={styles.button} type='submit'>Edit</button>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default EditForm;