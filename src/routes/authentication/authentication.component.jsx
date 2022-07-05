// Libraries needed to implement it by Google Redirect
//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.style.scss';

const Authentication = () => {

    // Sign-in using Google Redirect method 
    /* we'd have to use this if we'd use for example Google Redirect method
    useEffect(() => {
        async function getData() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
       }
        getData();
````},[]);*/

    /*const logGoogleRedirect = async () => {
        const { user } = await signInWithGoogleRedirect();
    }*/
    
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
 }

 export default Authentication;