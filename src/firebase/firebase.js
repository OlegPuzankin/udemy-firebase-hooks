import {firebaseConfig} from "./firebaseConfig";
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


class Firebase {

    constructor() {
        //debugger
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.firestore();

    }

    async register(name, email, password) {

        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        //debugger
        console.log('new user', newUser)

        return await newUser.user.updateProfile({
            displayName: name
        })
    }

    async login(email, password) {
        //debugger
        return await this.auth.signInWithEmailAndPassword(email, password);

    }
    async logout(){
        await this.auth.signOut();
    }

    async resetPassword (email){
        await this.auth.sendPasswordResetEmail(email);
    }

}

const firebase = new Firebase();

export default firebase;

