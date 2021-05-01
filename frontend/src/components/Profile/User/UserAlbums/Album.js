/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Link, useHistory, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {changeAlbum} from '../../../../store/albums'
import styles from './Album.module.css'


/*************************** COMPONENTS ***************************/

const EditAlbum = ({editOn, newName, setNewName, url, name, album, handleEditAlbum})=>{
    const handleKeyPress=(e)=>{
        if(e.key==='Enter'){
            handleEditAlbum()
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
            <Link className={styles.albumLink} to={`${url}/${name}`}>{name}</Link>
        )
    }

}


const Album = ({name, album})=>{
    const history=useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const {id:userId} = useParams()

    const {user} = useSelector(state => state.session);

    const [editOn, setEditOn] = useState(false)
    const [newName, setNewName] = useState(name)

    useEffect(()=>{
        setEditOn(false)
    },[])


    const array=Object.entries(album)
    let firstSong;

    if(array[0]){
        firstSong=array[0][1]
    }

    const albumClick=(e)=>{
        if(e.target.className.includes('albumArt') || e.target.className.includes('albumInfoDiv')){
            history.push(`${url}/${name}`)
        }
    }

    const handleEditAlbum=()=>{
        if(editOn){
            if(newName!==name){
                dispatch(changeAlbum(name, newName, user.id))
            }
        } else{
            setEditOn(true)
        }
    }

    return(
        <div className={styles.albumDiv} onClick={albumClick}>
            <div className={styles.albumArtDiv}>
                <img className={styles.albumArt} src={firstSong?.img ? firstSong?.img : `/img/Profile.png`}></img>
            </div>
            <div className={styles.albumInfoDiv}>
                <EditAlbum
                    editOn={editOn}
                    setEditOn={setEditOn}
                    newName={newName}
                    setNewName={setNewName}
                    url={url}
                    name={name}
                    album={album}
                    handleEditAlbum={handleEditAlbum}
                />
            </div>
            {parseInt(userId)===user?.id &&
                <div className={styles.editIconDiv}>
                    <i className={`fas fa-edit ${styles.editIcon}`} onClick={handleEditAlbum} name='edit'></i>
                    {editOn && <i className={`fas fa-times ${styles.cancelIcon}`}
                        onClick={()=>{
                            setEditOn(false)
                            setNewName(name)
                            }}
                        ></i>}
                </div>
            }
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Album;