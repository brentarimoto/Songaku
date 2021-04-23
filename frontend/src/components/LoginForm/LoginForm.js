/*************** REACT IMPORTS ***************/
/*************** OTHER IMPORTS ***************/
import InputField from '../InputField/InputField'
import  from './store/session';


/*************** COMPONENTS ***************/
const LoginForm = ()=>{
    return(
        <div className='login__form-div'>
            <form
                className='login__form'
            >
                <InputField classname='login__username-email' type='text' label='Username/Email'/>
                <InputField classname='login__password' type='password' label='Password'/>
            </form>
        </div>
    )
}

/*************** EXPORT ***************/
export default LoginForm;