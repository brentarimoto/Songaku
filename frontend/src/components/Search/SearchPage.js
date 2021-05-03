/*************************** REACT IMPORTS ***************************/
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../Song/Song'
import {searchSongs} from '../../store/search'
import styles from './SearchPage.module.css'


/*************************** COMPONENTS ***************************/
const SearchPage = ({setCurrentTab})=>{
    const dispatch = useDispatch()
    const search = useSelector(state => state.search);

    const {searchWords} = useParams()

    const string = searchWords.split('+?=').join(' ')

    useEffect(()=>{
        dispatch(searchSongs(string))
    }, [dispatch])

    if(!search){
        return(
            <ClipLoader />
        )
    }

    return(
        <div className={styles.songsDiv}>
            {/* <h1>{words}</h1> */}
            {Object.keys(search).length>0 && Object.entries(search).map(([id, song])=>(
                <Song key={id} song={song} />
            ))}
        </div>
    )
}

/*************************** EXPORT ***************************/
export default SearchPage;