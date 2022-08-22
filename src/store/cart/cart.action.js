import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

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


export const setIsCartOpen = (bool) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
