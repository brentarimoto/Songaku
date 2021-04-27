/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {editSong, getSongs} from '../../../store/songs'

import styles from './EditForm.module.css'


/*************************** COMPONENTS ***************************/
const EditForm = ({song, onClose})=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);

    const [title, setTitle] = useState(song?.title)
    const [album, setAlbum] = useState(song?.album)
    const [genreId, setGenreId] = useState(song?.genreId)
    const [music, setMusic] = useState(null)
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])

    const updateSong = (e) => {
        const file = e.target.files[0];
        if (file) setMusic(file);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const updateGenre = (e)=>{
        const genreId = Object.keys(genres).find(key => genres[key] === e.target.value);
        setGenreId(genreId)
    }

    const reset = () =>{
        setTitle('')
        setAlbum('')
        setMusic(null)
        setImage(null)
    }


    const handleEdit= async (e)=>{
        e.preventDefault();

        const newSong = {
            title,
            userId: user.id,
            album,
            music,
            image,
            genreId,
            songId: song.id
        }


        let {song: editedSong, reload, errors} = await dispatch(editSong(newSong))

        if(errors){return setErrors(errors.errors)}

        if(reload){await dispatch(getSongs(user.id))}

        if (editedSong?.id) {
            onClose()
        } else {
            console.log(editedSong?.message)
        }
    }


    return(
        <div className={styles.formDiv}>
            <ul className={styles.formErrors}>
                {errors.length>0 && errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form
                className={styles.form}
                onSubmit = { handleEdit }
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
                <div className={styles.music}>
                    <label className= {[styles.label, styles.musicLabel]} htmlFor='music'>Upload Song: </label>
                    <input
                        className={[styles.input, styles.musicInput]}
                        name='music'
                        type='file'
                        accept='.m4a, .mp3, .wav, .aac, .wma'
                        onChange={updateSong}
                    ></input>
                </div>
                <div className={styles.image}>
                    <label className= {[styles.label, styles.imageLabel]} htmlFor='image'>Upload Album Art: </label>
                    <input
                        className={[styles.input, styles.imageInput]}
                        name='image'
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={updateImage}
                    ></input>
                </div>
                <div className={styles.genre}>
                    <label className= {[styles.label, styles.genreLabel]} htmlFor='genre'>Genre: </label>
                    <select
                        className={[styles.input, styles.genreInput]}
                        name='genre'
                        onChange={updateGenre}
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