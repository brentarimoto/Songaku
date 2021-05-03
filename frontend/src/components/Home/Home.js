/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import Suggestions from '../Suggestions/Suggestions'
import styles from './Home.module.css'


/*************************** COMPONENTS ***************************/
const Home = ({isLoaded})=>{
    const dispatch=useDispatch()
    const { path } = useRouteMatch();
    const {id:userId} = useParams()

    const pageUser = useSelector(state => state.users[userId]);

    return (
        <div className={styles.mainSuggestions}>
            <div className={styles.topSongsDiv1}>
                <Suggestions genreId={4}/>
            </div>
            <div className={styles.topSongsDiv2}>
                <Suggestions genreId={13}/>
            </div>
            <div className={styles.topSongsDiv4}>
                <Suggestions genreId={14}/>
            </div>
            <div className={styles.topSongsDiv5}>
                <Suggestions genreId={10}/>
            </div>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Home;