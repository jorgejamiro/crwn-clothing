import { Routes, Route } from 'react-router-dom';
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component.jsx';

import Authentication from './routes/authentication/authentication.component';
import CheckOut from './routes/checkout/checkout.component';

import { useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils.js';

import { setCurrentUser } from './store/user/user.action';

import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // once initialized, our listener is going to keep track of the auth state automatically
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            // Creating a new user in our database if didn't exist previously
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []); // although we know 'dispatch' will never change (its reference)
         //due to the way Redux works, we're going to receive some warnings (not indicating 'dispatch')

  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shop/*' element={<Shop />} />
        <Route path='/auth' element={<Authentication />} />
        <Route path='/checkout' element={<CheckOut />} />
      </Route> 
    </Routes>
  );
};

export default App;