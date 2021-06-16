/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import {editSong} from '../../../store/songs'
import {setSong} from '../../../store/currentSong'

import styles from './EditForm.module.css'


/*************************** COMPONENTS ***************************/
const EditForm = ({song, onClose})=>{
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.session);
    const genres = useSelector(state => state.genres);
    const currentSong = useSelector(state => state.currentSong);

    const [title, setTitle] = useState(song?.title)
    const [album, setAlbum] = useState(song?.Album.name)
    const [genre, setGenre] = useState(song?.Genre.name)
    const [music, setMusic] = useState(null)
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const updateSong = (e) => {
        const file = e.target.files[0];
        if (file) setMusic(file);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const updateGenre = (e)=>{
        setGenre(e.target.value)
    }

    const reset = () =>{
        setTitle('')
        setAlbum('')
        setMusic(null)
        setImage(null)
    }


    const handleEdit= async (e)=>{
        e.preventDefault();

        setIsLoading(true)

        const genreId = Object.keys(genres).find(key => genres[key] === genre);


        const newSong = {
            title,
            userId: user.id,
            album,
            music,
            image,
            genreId,
            songId: song.id
        }


        let {song: editedSong, errors} = await dispatch(editSong(newSong))


        if(errors){setErrors(errors?.errors || [errors.message])}


        if (editedSong?.id) {
            if(currentSong?.id===editedSong.id){dispatch(setSong(editedSong))}
            onClose()
        } else {
            // console.log(editedSong?.message)
        }
        reset()
        setIsLoading(false)
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
                    <label className= {[styles.label]} htmlFor='title'>Title</label>
                    <input
                        className={[styles.input]}
                        name='title'
                        type='text'
                        placeholder='Title'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
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
                    ></input>
                </div>
                <div className={styles.music}>
                    <label className= {[styles.label]} htmlFor='music'>Upload Song</label>
                    <input
                        className={[styles.musicInput]}
                        name='music'
                        type='file'
                        accept='.m4a, .mp3, .wav, .aac, .wma'
                        onChange={updateSong}
                    ></input>
                </div>
                <div className={styles.image}>
                    <label className= {[styles.label]} htmlFor='image'>Upload Album Art</label>
                    <input
                        className={[styles.imageInput]}
                        name='image'
                        type='file'
                        accept='.jpg, .jpeg, .png'
                        onChange={updateImage}
                    ></input>
                </div>
                <div className={styles.genre}>
                    <label className= {[styles.label]} htmlFor='genre'>Genre</label>
                    <select
                        value={genre}
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
                        <ClipLoader className={styles.spinner}/> :
                        <button className={styles.button} type='submit'>Upload</button>
                    }
                </div>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default EditForm;