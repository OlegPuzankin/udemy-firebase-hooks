export default function validateCreateLink(values) {
    let errors = {};

    if(!values.description){
        errors.description='empty description field'
    }
    else if(values.description.length<10)
        errors.description='Description should be at least 10 characters';

    if(!values.url)
        errors.url='empty utl field'
    else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url))
        errors.password='invalid url'

    return errors;

}
