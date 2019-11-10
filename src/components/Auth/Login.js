import React, {useState} from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import fb from '../../firebase'
import {Link} from "react-router-dom";


const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
};

function Login(props) {

    //console.log(props);


    const [login, setLogin] = useState(true);
    const {changeHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
    const [loginError, setLoginError] = useState(null);

    async function authenticateUser() {

        const {name, email, password} = values;
        try {
            login
                ? await fb.login(email, password)
                : await fb.register(name, email, password);
            props.history.push('/')
        } catch (error) {
            setLoginError(error.message)
        }
    }


    return (

        <div>
            <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
            <form onSubmit={submitHandler} className='flex flex-column'>
                {!login && (
                    <input onChange={changeHandler}
                           value={values.name}
                           name='name'
                           type="text"
                           placeholder="Your name"
                           autoComplete="off"/>
                )}
                <input onChange={changeHandler}
                       className={errors.email && 'error-input'}
                       onBlur={handleBlur}
                       value={values.email}
                       name='email'
                       type="email"
                       placeholder="Your email"
                       autoComplete="off"/>
                {errors.email && <p className='error-text'>{errors.email}</p>}
                <input onChange={changeHandler}
                       className={errors.password && 'error-input'}
                       onBlur={handleBlur}
                       value={values.password}
                       name='password'
                       type="password"
                       placeholder="Choose a secure password"/>
                {errors.password && <p className='error-text'>{errors.password}</p>}
                {loginError && <p className='error-text'>{loginError}</p>}

                <div className="flex mt3">
                    <button
                        style={{background: isSubmitting ? 'grey' : 'orange'}}
                        disabled={isSubmitting}
                        type="submit" className="button pointer mr2">
                        Submit
                    </button>
                    <button

                        type="button"
                        className="pointer button"
                        onClick={() => setLogin(prevLogin => !prevLogin)}
                    >
                        {login ? "need to create an account?" : "already have an account?"}
                    </button>
                </div>
            </form>
            <div className='forgot-password'>
                <Link to={"/forgot"}>Forgot password</Link>
            </div>
        </div>
    );
}

export default Login;
