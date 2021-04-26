/*************************** REACT IMPORTS ***************************/
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import ProfileButton from './ProfileButton'
import DemoButton from '../DemoButton/DemoButton'

import styles from './Navigation.module.css'

/*************************** COMPONENTS ***************************/
// Conditional for showing login vs profile
const SetAuthDiv = () =>{
    const {user} = useSelector(state => state.session);
    if(!user){
        return (
            <>
                <div className = {styles.demoDiv}>
                    <DemoButton />
                </div>
                <div className = {styles.loginDiv}>
                    <NavLink activeClassName={styles.active} className = {styles.login} to='/login'>Login</NavLink>
                </div>
                <div className = {styles.signupDiv}>
                    <NavLink activeClassName={styles.active}  className = {styles.signup} to='/signup'>Signup</NavLink>
                </div>
            </>
        )
    }
    return(
        <>
            <div className = {styles.uploadDiv}>
                <NavLink activeClassName={styles.active} className={styles.upload} to='/upload'>Upload</NavLink>
            </div>
            <ProfileButton />
        </>
    )
}

const Navigation = ()=>{

    const history = useHistory()
    const {user} = useSelector(state => state.session);

    const handleLogo = (e)=>{
        history.replace('/')
    }

    return(
        <div className={styles.navDiv}>
            <nav className={styles.navbar}>
                <div className = {styles.logoDiv}>
                    <img className= {styles.logo} src={`/img/Songaku_Logo.png`} onClick={handleLogo}></img>
                </div>
                <div className = {styles.homeDiv}>
                    <NavLink activeClassName={styles.active}  className = {styles.home} exact to='/'>Home</NavLink>
                </div>
                <div className = {styles.searchDiv}>
                    {user? user.userName : 'App'}
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