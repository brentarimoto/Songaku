/*************************** REACT IMPORTS ***************************/

import { Switch, Route, useRouteMatch} from 'react-router-dom'

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