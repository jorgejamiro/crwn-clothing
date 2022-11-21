import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import './cart-item.style.scss';

const CartItem = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { i18n } = useTranslation();
    const lng = i18n.language;

    return ( 
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name[lng]}`} />
            <div className='item-details'>
                <span className='name'>{name[lng]}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
});

export default CartItem;