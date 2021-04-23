/*************************** REACT IMPORTS ***************************/
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import styles from './Navigation.module.css'

/*************************** COMPONENTS ***************************/

const ProfileButton = ()=>{
    return(
        <div className={styles.profileDiv}>
            <i class="far fa-user"></i>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default ProfileButton;