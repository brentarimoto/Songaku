/*************************** REACT IMPORTS ***************************/
import { useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/
import {login} from '../../store/session';

import styles from './LoginForm.module.css'


/*************************** COMPONENTS ***************************/
const LoginForm = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    if(user) {
        return(
            <Redirect to='/' />
        )
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const user = {
            credential,
            password
        }

        let loginUser = await dispatch(login(user))

        if (loginUser.userName) {
            history.replace('/')
        } else {
            setErrors(loginUser.errors)
        }
    }

    return(
        <div className={styles.formDiv}>
            <ul className={styles.formErrors}>
                {errors?.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form
                className={styles.form}
                onSubmit = { handleSubmit }
            >
                <div className={styles.credentials}>
                    <label className= {styles.loginLabel, styles.credentialLabel}>Username/Email: </label>
                    <input
                        className={styles.loginInput, styles.credentialInput}
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>
                </div>
                <div className={styles.password}>
                    <label className= {styles.loginLabel, styles.passwordLabel}>Password: </label>
                    <input
                        className={styles.loginInput, styles.passwordInput}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className={styles.button} type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default LoginForm;