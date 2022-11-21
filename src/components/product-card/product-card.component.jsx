import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { useTranslation } from 'react-i18next';


import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import './product-card.style.scss';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const lng = i18n.language;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    
    return (
        <div className='product-card-container'>
            <img src={ imageUrl } alt={`${name[lng]}`} />
            <div className='footer'>
                <span className='name'>{name[lng]}</span>
                <span className='price'>${price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} 
                    onClick={addProductToCart}>
                {t('msgAddToCart')}
            </Button>
        </div>
    );
}

export default ProductCard;