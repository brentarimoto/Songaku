/*************************** REACT IMPORTS ***************************/
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {logout} from '../../../store/session'

import styles from './LogoutButton.module.css'




/*************************** COMPONENTS ***************************/
const LogoutButton = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.session);

    const handleClick= async (e)=>{
        e.preventDefault();

        if(!user){return}

        await dispatch(logout())
        history.replace('/')
    }

    return(
        <div className={styles.logoutDiv}>
            <button
                className = {styles.logout}
                onClick = {handleClick}
            >Logout</button>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default LogoutButton;