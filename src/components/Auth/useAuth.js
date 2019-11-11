import React from "react";
import fb from '../../firebase/firebase'

function useAuth() {

    const [authUser, setAuthUser]=React.useState(null);


    React.useEffect(()=>{
        //console.log('use effect auth')
        const unsubscribe =fb.auth.onAuthStateChanged(user=>{
            //console.log(fb.auth)
            //debugger
            if(user)
                setAuthUser(user);
            else{
                setAuthUser(null);
                //console.log('no user')
            }
        });
        //console.log(unsubscribe);

        return ()=>{
            console.log('use effect auth return')
            unsubscribe();
        }

    }, []);

    return authUser
}

export default useAuth;
