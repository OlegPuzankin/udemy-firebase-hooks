import React, {useState} from "react";

function useFormValidation(initialState) {
    const [values, setValues]=useState(initialState)

    const changeHandler = (e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        e.persist()
        console.log(values);

    }

    return {changeHandler, submitHandler, values}

}



export default useFormValidation;
