import { useEffect, lazy, Suspense } from "react";

import { Routes, Route } from 'react-router-dom';

import Spinner from "./components/spinner/spinner.component";

import { checkUserSession } from './store/user/user.action';

import { useDispatch } from 'react-redux';

// Optimization: using dynamic import -> only requested when it's really needed
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Shop = lazy(() => import('./routes/shop/shop.component.jsx'));
const CheckOut = lazy(() => import('./routes/checkout/checkout.component'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []); // although we know 'dispatch' will never change (its reference)
         //due to the way Redux works, we're going to receive some warnings (not indicating 'dispatch')

  return(
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/shop/*' element={<Shop />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/checkout' element={<CheckOut />} />
        </Route> 
      </Routes>
    </Suspense>
  );
};

export default App;