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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );  

    // check if quantity is equal only to 1 unite, so it must be remove entirily from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // return back cart items after being modified
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id 
            ? { ...cartItem, quantity: cartItem.quantity - 1 } 
            : cartItem      
    );
};

const clearCartItem = (cartItems, cartItemToClear) => 
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);   

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => 
                                total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => 
                                total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, 
                    clearItemFromCart, cartTotal };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};