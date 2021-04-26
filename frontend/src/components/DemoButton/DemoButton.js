/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {login} from '../../store/session';

import styles from './DemoButton.module.css'


/*************************** COMPONENTS ***************************/
const DemoButton = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const user = {
            credential: 'DemoUser',
            password: 'demoTime',
        }

        await dispatch(login(user))

        history.replace('/')
    }

    return(
        <div className={styles.demoButtonDiv}>
            <form
                onSubmit = { handleSubmit }
            >
                <button className={styles.button} type='submit'>Demo</button>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default DemoButton;