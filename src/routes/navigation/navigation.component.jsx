import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutUser } from '../../utils/firebase/firebase.utils.js';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

//import './navigation.style.scss';
import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.jsx';


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrownLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser? (
                            <NavLink as='span' onClick={ signOutUser }>
                              SIGN OUT
                            </NavLink>
                          )
                        : (
                            <NavLink to='auth'>
                              SIGN IN
                            </NavLink>
                          )
          }
      
      {/*
              <CrownLogo className='logo' />
          </Link>
          <div className='nav-links-container'>
            <Link className='nav-link' to='shop'>SHOP</Link>
            {
              currentUser? (
                            <span className='nav-link' onClick={ signOutUser }>SIGN OUT</span>
                            )
                          : (
                              <Link className='nav-link' to='auth'>
                                SIGN IN
                              </Link>
                            )
            }
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
          */}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
  