/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {changePlaylist} from '../../../../store/playlists'
import {changeAlbum} from '../../../../store/albums'
import DeletePlaylistModal from './DeletePlaylist/DeletePlaylistModal'
import styles from './Playlist.module.css'


/*************************** COMPONENTS ***************************/

const EditPlaylist = ({editOn, setEditOn, newName, setNewName, url, playlist, handleEditPlaylist})=>{
    const handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            handleEditPlaylist()
        }
    }
    if(editOn){
        return(
            <div className={styles.editDiv}>
                <input className={styles.edit} value={newName} onChange={(e)=>setNewName(e.target.value)} onKeyPress={handleKeyPress}></input>
            </div>
        )
    } else {
        return(
            <Link className={styles.playlistLink} to={`${url}/${playlist.id}`}>{playlist.name}</Link>
        )
    }

}


const Playlist = ({id, playlist, album})=>{
    const history=useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const {id:userId} = useParams()

    const {user} = useSelector(state => state.session);

    const [editOn, setEditOn] = useState(false)
    const [newName, setNewName] = useState(playlist.name)


    const array=Object.entries(playlist.songs)
    let firstSong;

    if(array[0]){
        firstSong=array[0][1]
    }

    const playlistClick=(e)=>{
        if(e.target.className.includes('albumArt') || e.target.className.includes('playlistInfoDiv')){
            history.push(`${url}/${playlist.id}`)
        }
    }

    const handleEditPlaylist=()=>{
        if(editOn){
            if(newName!==playlist.name){
                if(album){
                    (async()=>{
                        await dispatch(changeAlbum(newName, id, user.id))
                        setEditOn(false)
                    })()
                } else{
                    (async()=>{
                        await dispatch(changePlaylist(newName, id, user.id))
                        setEditOn(false)
                    })()
                }
            }
        } else{
            setEditOn(true)
        }
    }

    return(
        <div className={styles.playlistDiv} onClick={playlistClick}>
            <div className={styles.albumArtDiv}>
                <img
                    alt=''
                    className={styles.albumArt}
                    src={ firstSong?.Album?.url || (firstSong?.User?.profilePic || '/img/Profile.png')}
                ></img>
            </div>
            <div className={styles.playlistInfoDiv}>
                <EditPlaylist editOn={editOn} setEditOn={setEditOn} newName={newName} setNewName={setNewName} url={url} playlist={playlist} handleEditPlaylist={handleEditPlaylist}/>
            </div>
            { parseInt(userId) === user?.id &&
                <>
                    {!album && <div className={styles.deleteIconDiv}>
                        <DeletePlaylistModal name={playlist.name} id={id}/>
                    </div>}
                    <div className={styles.editIconDiv}>
                        <i className={`fas fa-edit ${styles.editIcon}`} onClick={handleEditPlaylist} name='edit'></i>
                        {editOn && <i className={`fas fa-times ${styles.cancelIcon}`}
                            onClick={()=>{
                                setEditOn(false)
                                setNewName(playlist.name)
                                }}
                            ></i>}
                    </div>
                </>
            }
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Playlist;