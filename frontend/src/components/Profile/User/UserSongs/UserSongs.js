/*************************** REACT IMPORTS ***************************/
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../../../Song/Song'
import { getSongs } from '../../../../store/songs'
import styles from './UserSongs.module.css'


/*************************** COMPONENTS ***************************/
const UserSongs = ({setCurrentTab})=>{


    const dispatch = useDispatch()
    const songs = useSelector(state => state.songs);
    const genres = useSelector(state => state.genres);

    const {id:userId} = useParams()

    useEffect(()=>{
        setCurrentTab('Songs')
        if(!songs[userId]){
            dispatch(getSongs(userId))
        }
    },[dispatch])

    if(!songs[userId] || !genres[1]){
        return(
            <ClipLoader />
        )
    }

    return(
        <div className={styles.songsDiv}>
            {songs[userId] && Object.entries(songs[userId]).map(([id, song])=>(
                <Song key={id} song={song} userId={userId} />
            ))}
        </div>
    )
}

/*************************** EXPORT ***************************/
export default UserSongs;