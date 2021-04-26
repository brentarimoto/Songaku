/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

/*************************** OTHER FILE IMPORTS ***************************/
import LogoutButton from './LogoutButton/LogoutButton'

import styles from './Navigation.module.css'

/*************************** COMPONENTS ***************************/

const ProfileButton = ()=>{

    const [dropOpen, setDropOpen] = useState(false)

    const openDropdown = (e)=>{
        if(!dropOpen){
            setDropOpen(true)
        }
    }

    useEffect(()=>{
        if(!dropOpen){ return }

        const closeDropdown =() =>{
            setDropOpen(false)
        }

        document.addEventListener('click', closeDropdown)

        return ()=> document.removeEventListener('click', closeDropdown)
    },[dropOpen])


    return(
        <div
            id='profile_icon'
            className={styles.profileDiv}
            onClick={openDropdown}
        >
            <i className="far fa-user"></i>
            {dropOpen &&
                <div className={styles.dropdownDiv}>
                    <Link className = {styles.profile} to='/'>Profile</Link>
                    <LogoutButton />
                </div>
            }
        </div>
    )
}

/*************************** EXPORT ***************************/
export default ProfileButton;