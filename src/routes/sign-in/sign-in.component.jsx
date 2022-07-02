//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

import { 
    //auth,
    createUserDocumentFromAuth, 
    signInWithGooglePopup, 
    //signInWithGoogleRedirect, 
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    // we'd have to use this if we'd use for example Google Redirect method
    //useEffect(() => {
    //    async function getData() {
    //        const response = await getRedirectResult(auth);
    //        if (response) {
    //            const userDocRef = await createUserDocumentFromAuth(response.user);
    //        }
    //    }
    //    getData();
    //},[]);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        // Creating a new user in our database if didn't exist previously
        const userDocRef = await createUserDocumentFromAuth(user);
    };
    
    return (
        <div>
            <h1>SignIn Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
 }

 export default SignIn;