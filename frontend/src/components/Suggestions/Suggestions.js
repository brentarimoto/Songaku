/*************************** REACT IMPORTS ***************************/
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../Song/Song'
import { getTopSongs } from '../../store/topSongs'
import styles from './Suggestions.module.css'


/*************************** COMPONENTS ***************************/
const Suggestions = ({genreId})=>{

    const dispatch = useDispatch()
    const topSongs = useSelector(state => state.topSongs);
    const genres = useSelector(state => state.genres);

    useEffect(()=>{
        if(!topSongs[genreId]){
            dispatch(getTopSongs(genreId))
        }
    },[dispatch])

    if(!topSongs[genreId] || !genres[genreId]){
        return(
            <ClipLoader />
        )
    }

    return(
        <div className={styles.suggestionsDiv}>
            <h2>Top {genres[genreId]} Songs: </h2>
            {topSongs[genreId] && Object.entries(topSongs[genreId]).map(([id, song])=>(
                <Song key={id} song={song}/>
            ))}
        </div>

    )
}

/*************************** EXPORT ***************************/
export default Suggestions;