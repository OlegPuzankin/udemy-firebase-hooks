import React from "react";
import {FirebaseContext} from "../../firebase";

function ForgotPassword() {

    const {fb} = React.useContext(FirebaseContext)

    const [resetPassword, setResetPassword] = React.useState('');
    const [isPasswordReset, setIsPasswordReset] = React.useState(false);
    const [resetPasswordError, setResetPasswordError] =React.useState(null)



    async function handleResetPassword() {
      try {
        await fb.resetPassword(resetPassword);
        setIsPasswordReset(true);
        setResetPasswordError(null);
      }
      catch (error){
        console.log(error.message);
        setResetPasswordError(error.message)
      }

    }

    return (
        <div>
            <input className='input'
                // value={resetPassword}
                   onChange={event => setResetPassword(event.target.value)}
                   type="email"/>
            <div>
                <button className='button' onClick={handleResetPassword}>Reset password</button>
            </div>
          {isPasswordReset && <p>Check e-mail</p>}
          {resetPasswordError && <p className='error-text'>{resetPasswordError}</p>}

        </div>);
}

export default ForgotPassword;
