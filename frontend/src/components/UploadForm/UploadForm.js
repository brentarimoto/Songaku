/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {uploadSong} from '../../store/mySongs';

import styles from './UploadForm.module.css'


/*************************** COMPONENTS ***************************/
const UploadForm = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);

    const [title, setTitle] = useState('')
    const [album, setAlbum] = useState('')
    const [music, setMusic] = useState(null)
    const [image, setImage] = useState('https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')
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
        setImage('https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg')
    }

    const handleGenre = (e)=>{
        setGenreId(genres.indexOf(e.target.value)+1)
    }

    const handleUpload= async (e)=>{
        e.preventDefault();

        const song = {
            title,
            userId: user.id,
            album,
            music,
            image,
            genreId
        }


        let addedSong = await dispatch(uploadSong(song))

        if (addedSong.id) {
            console.log(addedSong)
        } else {
            console.log(addedSong)
        }
    }


    return(
        <form className={styles.formDiv}
            onSubmit={handleUpload}
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
                    onChange={updateImage}
                ></input>
            </div>
            <div className={styles.genre}>
                <label className= {[styles.label, styles.genreLabel]} htmlFor='genre'>Genre: </label>
                <select
                    className={[styles.input, styles.genreInput]}
                    name='genre'
                    onChange={handleGenre}
                >
                    {genres.map(genre=>(
                        <option key={genre}>{genre}</option>
                    ))}
                </select>
            </div>
            <button className={styles.button} type='submit'>Upload</button>
        </form>
    )
}

/*************************** EXPORT ***************************/
export default UploadForm;