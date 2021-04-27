/*************************** REACT IMPORTS ***************************/
import { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import {signup} from '../../store/session';

import styles from './SignupForm.module.css'




/*************************** COMPONENTS ***************************/
const SignupForm = ()=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    if(user) {
        return(
            <Redirect to='/' />
        )
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(password!==confirmPassword){
            setErrors(['Password and Confirm Password do not match'])
            return
        }

        const user = {
            email,
            username,
            password
        }

        let newUser = await dispatch(signup(user))

        if (newUser.username) {
            history.replace('/')
        } else {
            setErrors(newUser.errors)
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
                <div className={styles.email}>
                    <label className= {[styles.signupLabel, styles.emailLabel]}>Email: </label>
                    <input
                        className={[styles.signupInput, styles.emailInput]}
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                </div>
                <div className={styles.username}>
                    <label className= {[styles.signupLabel, styles.usernameLabel]}>Username: </label>
                    <input
                        className={[styles.signupInput, styles.usernameInput]}
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    ></input>
                </div>
                <div className={styles.password}>
                    <label className= {[styles.signupLabel, styles.passwordLabel]}>Password: </label>
                    <input
                        className={[styles.signupInput, styles.passwordInput]}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                </div>
                <div className={styles.password}>
                    <label className= {[styles.signupLabel, styles.passwordLabel]}>Confirm Password: </label>
                    <input
                        className={[styles.signupInput, styles.passwordInput]}
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <button className={styles.button} type='submit'>Signup</button>
                </div>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default SignupForm;