/*************************** REACT IMPORTS ***************************/
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import LoginModal from '../Login/LoginModal'
import SignupModal from '../Signup/SignupModal'
import UploadModal from '../Upload/UploadModal'
import ProfileButton from './ProfileButton'
import DemoButton from '../DemoButton/DemoButton'
import SearchBar from './SearchBar/SearchBar'

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
                    <LoginModal />
                </div>
                <div className = {styles.signupDiv}>
                    <SignupModal />
                </div>
            </>
        )
    }
    return(
        <>
            <div className = {styles.profileNavDiv}>
                <NavLink
                    activeClassName={styles.active}  className = {styles.profileNav}
                    to={`/users/${user.id}/songs`}
                >Songs</NavLink>
            </div>
            <div className = {styles.profileNavDiv}>
                <NavLink
                    activeClassName={styles.active}  className = {styles.profileNav}
                    to={`/users/${user.id}/albums`}
                >Albums</NavLink>
            </div>
            <div className = {styles.profileNavDiv}>
                <NavLink
                    activeClassName={styles.active}  className = {styles.profileNav}
                    to={`/users/${user.id}/playlists`}
                >Playlists</NavLink>
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
        <nav className={styles.navbar}>
            <div className = {styles.logoDiv}>
                <img alt='' className= {styles.logo} src={`/img/Songaku_Logo.png`} onClick={handleLogo}></img>
            </div>
            <div className={styles.homeUpload}>
                <div className = {styles.homeDiv}>
                    <NavLink activeClassName={styles.active}  className = {styles.home} exact to='/'>Home</NavLink>
                </div>
                {user && <div className = {styles.uploadDiv}>
                    <UploadModal />
                </div>}
            </div>
            <div className = {styles.searchDiv}>
                <SearchBar />
            </div>
            <div className = {styles.authDiv}>
                <SetAuthDiv />
            </div>
        </nav>
    )
}

/*************************** EXPORT ***************************/
export default Navigation;