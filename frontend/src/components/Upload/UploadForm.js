/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {uploadSong, getSongs} from '../../store/songs';

import styles from './UploadForm.module.css'


/*************************** COMPONENTS ***************************/
const UploadForm = ({title, setTitle, album, setAlbum, music, setMusic, image, setImage, setShowModal})=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const songs = useSelector(state => state.songs);
    const genres = useSelector(state => state.genres);

    const [genreId, setGenreId] = useState(1)

    const [errors, setErrors] = useState([])

    const updateSong = (e) => {
        const file = e.target.files[0];
        if (file) setMusic(file);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const reset = () =>{
        setTitle('')
        setAlbum('')
        setMusic(null)
        setImage(null)
    }

    const updateGenre = (e)=>{
        const genreId = Object.keys(genres).find(key => genres[key] === e.target.value);
        setGenreId(genreId)
    }

    const handleUpload= async (e)=>{
        e.preventDefault();

        if(!songs[user.id]){
            dispatch(getSongs(user.id))
        }

        const song = {
            title,
            userId: user.id,
            album,
            music,
            image,
            genreId
        }


        let {song:addedSong, errors} = await dispatch(uploadSong(song))

        if(errors){setErrors(errors?.errors || [errors.message])}

        if (addedSong?.id) {
            reset()
            setShowModal(false)
            history.replace(`/users/${user.id}/songs`)
        }
    }


    return(
        <form className={styles.formDiv}
            onSubmit={handleUpload}
        >
            <ul className={styles.formErrors}>
                {errors.length>0 && errors.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
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
            <button className={styles.button} type='submit'>Upload</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default UploadForm;