/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import {uploadSong, getSongs} from '../../store/songs';
import {loadAlbums} from '../../store/albums'

import styles from './UploadForm.module.css'


/*************************** COMPONENTS ***************************/
const UploadForm = ({title, setTitle, album, setAlbum, music, setMusic, image, setImage, setShowModal})=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const songs = useSelector(state => state.songs);
    const genres = useSelector(state => state.genres);

    const [genreId, setGenreId] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

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

        setIsLoading(true)

        const song = {
            title,
            userId: user.id,
            album,
            music,
            image,
            genreId
        }


        let {song:addedSong, errors} = await dispatch(uploadSong(song))
        await dispatch(loadAlbums(user.id))

        if(errors){setErrors(errors?.errors || [errors.message])}

        if (addedSong?.id) {
            reset()
            setShowModal(false)
            history.replace(`/users/${user.id}/songs`)
        }
        setIsLoading(false)
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
                <label className= {[styles.label]} htmlFor='title'>Title</label>
                <input
                    className={[styles.input]}
                    name='title'
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    autocomplete="off"
                    required
                ></input>
            </div>
            <div className={styles.album}>
                <label className= {[styles.label]} htmlFor='album'>Album</label>
                <input
                    className={[styles.input]}
                    name='album'
                    type='text'
                    placeholder='Album'
                    value={album}
                    onChange={(e)=>setAlbum(e.target.value)}
                    autocomplete="off"
                    required
                ></input>
            </div>
            <div className={styles.music}>
                <label className= {[styles.label]} htmlFor='music'>Upload Song: </label>
                <input
                    className={[styles.musicInput]}
                    id='music'
                    type='file'
                    accept='.m4a, .mp3, .wav, .aac, .wma'
                    onChange={updateSong}
                ></input>
            </div>
            <div className={styles.image}>
                <label className= {[styles.label,]} htmlFor='image'>Upload Album Art: </label>
                <input
                    className={[styles.imageInput]}
                    name='image'
                    type='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={updateImage}
                ></input>
            </div>
            <div className={styles.genre}>
                <label className= {[styles.label]} htmlFor='genre'>Genre: </label>
                <select
                    className={[styles.genreInput]}
                    name='genre'
                    onChange={updateGenre}
                >
                    {Object.entries(genres).map(genre=>(
                        <option key={genre[1]}>{genre[1]}</option>
                    ))}
                </select>
            </div>
            <div className={styles.buttonDiv}>
                {isLoading ?
                    <ClipLoader /> :
                    <button className={styles.button} type='submit'>Upload</button>
                }
            </div>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default UploadForm;