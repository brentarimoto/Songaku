/*************************** REACT IMPORTS ***************************/
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {searchSongs} from '../../../store/search'

import styles from './SearchBar.module.css'

/*************************** COMPONENTS ***************************/

const SearchBar = ()=>{
    const dispatch=useDispatch()
    const history = useHistory()
    const {user} = useSelector(state => state.session);

    const [searchWords, setSearchWords] =  useState('')

    const handleSearch = (e)=>{
        if(e.key==='Enter'){
            dispatch(searchSongs(searchWords))
            history.replace(`/search/${searchWords.toLowerCase().split(' ').join('+?=')}`)
            setSearchWords('')
        }
    }

    return(
        <nav className={styles.searchBarDiv}>
            <input
                className={styles.searchBar}
                value={searchWords}
                placeholder='Search'
                onChange={(e)=>setSearchWords(e.target.value)}
                onKeyPress={handleSearch}
            ></input>
        </nav>
    )
}

/*************************** EXPORT ***************************/
export default SearchBar;