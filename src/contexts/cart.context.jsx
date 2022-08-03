import { createContext, useState, useEffect } from "react";

// Helper function in order to update cartItems array. It depends on if the 
// product already existed or not. 
const addCartItem = (cartItems, productToAdd) => {
    // figure out if 'cartItems' contains 'productToAdd' or not.
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if product already existed, then we'll increment quantity in one unit.
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
                    cartItem.id === productToAdd.id 
                        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
                        : cartItem      
                    );
    }

    // if product not existed, then we'll add a new one
    return [...cartItems, { ...productToAdd, quantity: 1 }]; 
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => 
                                total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};