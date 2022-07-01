import { initializeApp} from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWBcpk7fFcfzZnY5HWJfcKjBMHzo2QLz0",
    authDomain: "crwn-clothing-db-526ab.firebaseapp.com",
    projectId: "crwn-clothing-db-526ab",
    storageBucket: "crwn-clothing-db-526ab.appspot.com",
    messagingSenderId: "861952796289",
    appId: "1:861952796289:web:dc701955f6d5cf2be6cf80"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
    prompt: "select_account" // force user to select an account
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    // return doc ref from database 'db', 'users' collection with 'uid' from user Authorization
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot.exists());
    
    // if user data doesn't exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
    
};

