import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import { useTranslation } from 'react-i18next';
// in order to 'jump' to a specific page
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }
    
    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    )))
                    : (
                        <EmptyMessage>{t('msgEmptyCart')}</EmptyMessage>
                    )
                }
            </CartItems>
            <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckoutHandler}>{t('msgCheckout')}</Button>
        </CartDropdownContainer>
    );
}

export default CartDropdown;