export default function validateLogin(values) {
    let errors = {};

    if(!values.email){
        errors.email='empty e-mail field'
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email='invalid e-mail';

    if(!values.password)
        errors.password='empty password field'
    else if(values.password.length<6)
        errors.password='password should be at least 6 characters'

    return errors;

}
