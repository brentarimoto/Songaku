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
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [photo, setPhoto] = useState(null)
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
            setErrors(['Passwords do not match'])
            return
        }

        const user = {
            email,
            userName,
            password,
            photo
        }

        let newUser = await dispatch(signup(user))

        if (newUser.userName) {
            history.replace('/')
        } else {
            setErrors(newUser.errors)
        }
    }

    return(
        <div className={styles.formDiv}>
            <h2>Create your account here</h2>
            {errors.length>0 &&
            <ul className='formErrors'>
                {errors?.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>}
            <form
                className={styles.form}
                onSubmit = { handleSubmit }
            >
                <div className={styles.email}>
                    <input
                        className={[styles.signupInput]}
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                </div>
                <div className={styles.username}>
                    <input
                        className={[styles.signupInput]}
                        type='text'
                        placeholder='Username'
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    ></input>
                </div>
                <div className={styles.profilePic}>
                    <div className={styles.profilePicText} name='profpic'>
                        {photo ? `${photo.name}` : "No file chosen"}
                    </div>
                    <input
                        className={[styles.signupInput]}
                        type='file'
                        id="profpic__input"
                        onChange={(e)=>setPhoto(e.target.files[0])}
                        hidden
                    ></input>
                    <label htmlFor="profpic__input" className={styles.profilePicButton}>
                      <div id="profpic__btn-button">Choose File</div>
                    </label>
                </div>
                <div className={styles.password}>
                    <input
                        className={[styles.signupInput]}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                </div>
                <div className={styles.password}>
                    <input
                        className={[styles.signupInput]}
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