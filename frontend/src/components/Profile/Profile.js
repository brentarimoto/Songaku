/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect, Switch, Route, NavLink, useRouteMatch, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import User from './User/User'
import SongPage from '../SongPage/SongPage'

import styles from './Profile.module.css'


/*************************** COMPONENTS ***************************/
const Profile = ({isLoaded})=>{

    const { path } = useRouteMatch();

    return (
        <div className={styles.mainProfile}>
            <Switch>
                <Route path={`${path}/songs/:songId`}>
                    <SongPage />
                </Route>
                <Route path={`${path}`}>
                    <User/>
                </Route>
            </Switch>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Profile;