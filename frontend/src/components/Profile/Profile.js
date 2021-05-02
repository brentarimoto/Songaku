/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import User from './User/User'
import SongPage from '../SongPage/SongPage'
import {getUser} from '../../store/users'

import styles from './Profile.module.css'


/*************************** COMPONENTS ***************************/
const Profile = ({isLoaded})=>{
    const dispatch=useDispatch()
    const { path } = useRouteMatch();
    const {id:userId} = useParams()

    const pageUser = useSelector(state => state.users[userId]);

    useEffect(()=>{
        if(!pageUser){
            dispatch(getUser(userId))
        }
    },[dispatch])

    return (
        <div className={styles.mainProfile}>
            <Switch>
                <Route path={`${path}/songs/:songId`}>
                    <SongPage />
                </Route>
                <Route path={`${path}`}>
                    <User pageUser={pageUser}/>
                </Route>
            </Switch>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Profile;