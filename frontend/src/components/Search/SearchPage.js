/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader'
import {csrfFetch} from '../../store/csrf'

/*************************** OTHER FILE IMPORTS ***************************/
import Song from '../Song/Song'
// import { getSongs } from '../../../../store/songs'
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