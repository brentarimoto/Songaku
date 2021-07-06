/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import UserSongs from './UserSongs/UserSongs'
import UserPlaylists from './UserPlaylists/UserPlaylists'
import UserAlbums from './UserAlbums/UserAlbums'
import AddPlaylistModal from './AddPlaylist/AddPlaylistModal'
import Suggestions from '../../Suggestions/Suggestions'

import {getUser} from '../../../store/users'
import { editUser } from '../../../store/session';

import styles from './User.module.css'


/*************************** COMPONENTS ***************************/
const User = ()=>{
    const dispatch=useDispatch()
    const { path, url } = useRouteMatch();
    const {id:userId} = useParams()

    const users = useSelector(state => state.users);
    const {user} = useSelector(state => state.session);

    const pageUser = user?.id===parseInt(userId) ? user : users[userId]

    const [currentTab, setCurrentTab] = useState('')
    const [editOn, setEditOn] = useState(false)
    const [username, setUsername] = useState(user?.userName)
    const [about, setAbout] = useState(user?.about)
    const [photo, setPhoto] = useState(null)
    const [errors, setErrors] = useState([])


    useEffect(()=>{
        if(!users[userId]){
            dispatch(getUser(userId))
        }
    },[dispatch, url])

    useEffect(()=>{
        if (username!==user?.userName){
            setUsername(user?.userName)
        }

        if (about!==user?.about){
            setAbout(user?.about)
        }

    },[user])

    const editUsername = (e)=>{
        setUsername(e.target.value)
    }

    const editAbout = (e)=>{
        setAbout(e.target.value)
    }

    const handleCancel = (e)=>{
        setUsername(user?.userName)
        setAbout(user?.about || '')
        setPhoto(null)
        setEditOn(false)
    }

    const handleEdit = (e)=>{
        (async()=>{
            let editedUser = await dispatch(editUser({id:user.id, userName:username, about, profilePic:photo}))

            if (editedUser.userName) {
                setEditOn(false)
            } else {
                console.log(editedUser.errors)
                setErrors(editedUser.errors)
            }
        })()

    }

    return (
        <div className={styles.userDiv}>
            <div className={styles.info}>
                <div className={styles.profPicDiv}>
                    <img alt='' className={styles.profPic} src={pageUser?.profilePic ? pageUser.profilePic : `/img/Profile.png`}></img>
                    {editOn &&
                    <div className={styles.picButtonDiv}>
                        <input type="file" id="profpic-btn" onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                        <label tabIndex='0' htmlFor="profpic-btn" className={styles.picButton}>{photo?.name || 'New Image'}</label>
                    </div>}
                </div>
                <div className={styles.nameSection}>
                    <div className={styles.userName}>
                        { editOn ?
                            <input
                                className={styles.input}
                                value={username}
                                onChange={editUsername}
                            />
                            :
                            <h2>{parseInt(userId)===user?.id ? user?.userName : pageUser?.userName}</h2>
                        }
                    </div>
                    {/* <div className={styles.firstName}>
                        <h4>{pageUser?.firstName && `(${pageUser?.firstName}`}</h4>
                    </div>
                    <div className={styles.lastName}>
                        <h4>{pageUser?.lastName && `${pageUser?.lastName})`}</h4>
                    </div> */}
                </div>
                <div className={styles.otherInfo}>
                    { editOn ?
                        <textarea
                            className={styles.textarea}
                            value={about || ''}
                            onChange={editAbout}
                        />
                        :
                        <h4 className={styles.about}>{parseInt(userId)===user?.id ? user?.about : pageUser?.about}</h4>
                    }
                </div>
                {parseInt(userId)===user?.id &&
                <div className={styles.editButton}>
                    {(editOn) ?
                        <>
                            <i onClick={handleEdit}>Confirm</i>
                            <i onClick={handleCancel}>Cancel</i>
                        </>
                        :
                        <i className={"fas fa-user-edit"} onClick={e=>setEditOn(true)}></i>
                    }
                </div>}
            </div>
            <div className={styles.itemsDiv}>
                <nav className={styles.itemsNav}>
                    <NavLink className={styles.navItem} activeClassName={styles.active} to={`${url}/songs`} name='Songs' onClick={(e)=>setCurrentTab(e.target.name)}>Songs</NavLink>
                    <NavLink className={styles.navItem} activeClassName={styles.active} to={`${url}/albums`} name='Albums' onClick={(e)=>setCurrentTab(e.target.name)}>Albums</NavLink>
                    <NavLink className={styles.navItem}  activeClassName={styles.active} to={`${url}/playlists`} name='Playlist' onClick={(e)=>setCurrentTab(e.target.name)}>Playlist</NavLink>
                    <div className={styles.navItemSpacer}>
                        <div className={styles.navItemLine}>
                            {(currentTab==='Playlist' && parseInt(userId)===user?.id) && <AddPlaylistModal />}
                        </div>
                    </div>
                </nav>
                <div className={styles.itemDiv}>
                    <Switch>
                        <Route exact path={`${path}`}>
                            <Redirect to={`${url}/songs`}/>
                        </Route>
                        <Route path={`${path}/songs`}>
                            <UserSongs setCurrentTab={setCurrentTab}/>
                        </Route>
                        <Route path={`${path}/albums`}>
                            <UserAlbums setCurrentTab={setCurrentTab}/>
                        </Route>
                        <Route path={`${path}/playlists`}>
                            <UserPlaylists setCurrentTab={setCurrentTab}/>
                        </Route>
                    </Switch>
                </div>
            </div>
            <div className={styles.topSongsDiv}>
                <Suggestions genreId={4}/>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default User;