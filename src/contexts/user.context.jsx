import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils.js';

// actual value you want to access
export const UserContext = createContext({
    currentUser: null,  // in order to know if there's an actual UserContext or not
    setCurrentUser: () => null,
});

// provider -> it'll wrap around any component than need to access to the values
export const UserProvider = ( { children } ) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };
    
    useEffect(() => {
        // once initialized, our listener is going to keep track of the auth state automatically
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                // Creating a new user in our database if didn't exist previously
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
    
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
};