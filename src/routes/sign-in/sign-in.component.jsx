import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    
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
        </div>
    )
 }

 export default SignIn;