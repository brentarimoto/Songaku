/*************************** REACT IMPORTS ***************************/
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {loadPlaylists, addSongPlaylist, deleteSongPlaylist} from '../../../store/playlists'
import styles from './AddToPlaylist.module.css'



/*************************** COMPONENTS ***************************/
const AddToPlaylist = ({song})=>{
    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.session)
    const playlists = useSelector(state => state.playlists);
    useEffect(()=>{
        if(!playlists[user?.id]){
            dispatch(loadPlaylists(user?.id))
        }
    },[dispatch])

    let inPlaylist=[];
    let notPlaylist=[]

    if(playlists[user?.id] && song){
        Object.entries(playlists[user?.id]).forEach(([id, playlist])=>{
            if(playlist.songs[song?.id]){
                inPlaylist.push(playlist.id)
            } else{
                notPlaylist.push(playlist.id)
            }
        })
    }

    const handleAddToPlaylist=(e)=>{
        if(e.target.value==='0'){return}

        if(inPlaylist.includes(parseInt(e.target.value))){
            dispatch(deleteSongPlaylist(parseInt(e.target.value), song?.id, user?.id))
        } else if(notPlaylist.includes(parseInt(e.target.value))){
            dispatch(addSongPlaylist(parseInt(e.target.value), song?.id, user?.id))
        }
    }


    return(
        <div className={styles.addToPlaylistDiv}>
            <select className={styles.addToPlaylist} onChange={handleAddToPlaylist}>
                <option className={styles.optionHeader} value={0}>--Playlists--</option>
                {inPlaylist.map((id)=>(
                    <option className={styles.inPlaylist} key={id} value={id}>{playlists[user?.id][id].name}</option>
            ))}
                <option className={styles.optionHeader} value={0}>--Add To--</option>
                {notPlaylist.map((id)=>(
                    <option className={styles.notPlaylist} key={id} value={id}>{playlists[user?.id][id].name}</option>
                ))}
            </select>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default AddToPlaylist;