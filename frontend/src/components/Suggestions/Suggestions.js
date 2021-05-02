/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../../../Song/Song'
import { getSongs } from '../../../../store/songs'
import styles from './Suggestions.module.css'


/*************************** COMPONENTS ***************************/
const UserSongs = ({type})=>{

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres);

    const [suggestedSongs, setSuggestedSongs]=useState()

    // const {id:userId} = useParams()

    // useEffect(()=>{
    // },[dispatch])

    // if(!songs[userId] || !genres[1]){
    //     return(
    //         <ClipLoader />
    //     )
    // }

    return(
        <div className={styles.suggestionsDiv}>
            <h2>Suggestions</h2>
            {/* {songs[userId] && Object.entries(songs[userId]).map(([id, song])=>(
                <Song key={id} song={song} userId={userId} />
            ))} */}
        </div>

    )
}

/*************************** EXPORT ***************************/
export default UserSongs;