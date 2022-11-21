import { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { signOutStart } from '../../store/user/user.action';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

import { useTranslation } from 'react-i18next';
import { Tab } from 'evergreen-ui';

import { NavigationContainer, NavLinks, NavLink, LogoContainer, TabLang, User } from './navigation.styles';


const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [indexSelected, setIndexSelected] = useState(0);
  const tabsHeading = ['en', 'es'];
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const signOutUser = () => dispatch(signOutStart());

  return(
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrownLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            {t('SHOP')}
          </NavLink>
          {
            currentUser? (
                            <NavLink as='span' onClick={ signOutUser }>
                              {t('SIGN OUT')}
                            </NavLink>
                          )
                        : (
                            <NavLink to='auth'>
                              {t('SIGN IN')}
                            </NavLink>
                          )
          }
          <CartIcon />
          <User>
            { currentUser && currentUser.displayName }
          </User>
          <TabLang>
            {tabsHeading.map((tab, index) => (
                <Tab
                    key={tab}
                    isSelected={index === indexSelected}
                    appearance='primary'
                    color='black'
                    backgroundColor='white'
                    fontSize='1rem'

                    onSelect={() => {
                        setIndexSelected(index);
                        changeLanguage(tab);
                    }}
                >
                    {tab}
                </Tab>
            ))}
          </TabLang>
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}

export default Navigation;
  