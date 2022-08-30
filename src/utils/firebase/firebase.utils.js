import { initializeApp} from 'firebase/app';
import { 
    getAuth,
    // In order to implement Google Redirect method
    //signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch, // in order to do db transactions
    query,
    getDocs,
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

  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: "select_account" // force user to select an account
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  // In orde to implement Google Redirect
  //export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    // Attaching operations to the batch
    objectsToAdd.forEach((object) => {
        // function 'doc' is going to give us always a reference even if there wasn't any before
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
  };

  
  /* Example of the structure:
  {
    hats: {
        title: 'Hats',
        items: [
            {},
            {},
            ...
            {}
        ]
    },
    sneakers: {
        title: 'Sneakers',
        items: [
            {},
            {},
            ...
            {}
        ]
    }
  }
  ...
  */
  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
  };

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    
    // return doc ref from database 'db', 'users' collection with 'uid' from user Authorization
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    // if user data didn't exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userSnapshot;
    
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
             onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        // we don't want this listener to be active, we just want to unsubscribe
        // only the moment we get the value
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe(); // we need to close the listener
                resolve(userAuth);
            },
            reject
        )
    });
};
