import React from "react";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import {FirebaseContext} from "../../firebase";

const INITIAL_STATE={
  description:'',
  url:''
};

function CreateLink(props) {

  const {fb, user}=React.useContext(FirebaseContext);

  const {handleBlur, submitHandler, changeHandler, values, errors}=
        useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  function handleCreateLink(){

    if(!user)
      props.history.push('/login');
    else{
      const{description, url}=values;
      const newLink={
        description,
        url,
        postedBy:{
          id: user.uid,
          name: user.displayName
        },
        votes:[],
        comments: [],
        created: Date.now(),
      };

      fb.db.collection('links').add(newLink);
      props.history.push('/')
    }
    console.log('link created');

  }


  return (
        <form className='flex flex-column mt2' onSubmit={submitHandler}>
            <input type="text"
                   onBlur={handleBlur}
                   value={values.description}
                   onChange={changeHandler}
                   name='description'
                   autoComplete={'off'}
                   className={errors.description && 'error-input'}
                   placeholder={'Type description'}/>
          {errors.description && <p className='error-text'>{errors.description}</p>}
            <input type="url"
                   onBlur={handleBlur}
                   value={values.url}
                   onChange={changeHandler}
                   name='url'
                   autoComplete={'off'}
                   className={errors.description && 'error-input'}
                   placeholder={'Type url'}/>
          {errors.url && <p className='error-text'>{errors.url}</p>}

          <button className='button' type='submit'>Submit</button>


        </form>);
}

export default CreateLink;
