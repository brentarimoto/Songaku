/*************************** REACT IMPORTS ***************************/
import { Redirect,useParams } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../../../Song/Song'
import styles from './AlbumPage.module.css'


/*************************** COMPONENTS ***************************/
const AlbumPage = ({userId, albums})=>{
    const {albumId} = useParams()

    if(!albums[userId]){
        return(
            <ClipLoader/>
        )
    }

    let songs;
    let name;

    if(albums[userId]){
        if(!albums[userId][albumId]){
            return(
                <Redirect to={`/users/${userId}/albums`}/>
            )
        }


        if(albums[userId][albumId]){
            songs = albums[userId][albumId].songs
        }


        if(albums[userId][albumId]){
            name = albums[userId] ? albums[userId][albumId].name : null;
        }
    }

    return(
        <div className={styles.albumSongsDiv}>
            <div className={styles.albumHeaderDiv}>
                <h2 className={styles.albumName}>{name}</h2>
            </div>
            <div className={styles.albumSongs}>
                {songs && Object.entries(songs).map(([id, song])=>(
                    <Song key={id} song={song} userId={userId} />
                ))}
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default AlbumPage;