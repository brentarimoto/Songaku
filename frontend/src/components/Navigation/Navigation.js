/*************************** REACT IMPORTS ***************************/
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import ProfileButton from './ProfileButton'
import LogoutButton from './LogoutButton/LogoutButton'

import styles from './Navigation.module.css'

/*************************** COMPONENTS ***************************/

// Conditional for showing login vs profile
const SetAuthDiv = () =>{
    const {user} = useSelector(state => state.session);

    if(!user){
        return (
            <>
                <NavLink className = {styles.login} to='/login'>Login</NavLink>
                <NavLink className = {styles.signup} to='/signup'>Signup</NavLink>
            </>
        )
    }
    return(
        <>
            <ProfileButton />
            <LogoutButton />
        </>
    )
}

const Navigation = ()=>{

    return(
        <div className={styles.navDiv}>
            <nav className={styles.navbar}>
                <div className = {styles.homeDiv}>
                    <NavLink className = {styles.home} to='/'>Home</NavLink>
                </div>
                <div className = {styles.authDiv}>
                    <SetAuthDiv />
                </div>
            </nav>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default Navigation;