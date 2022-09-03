import { CartItem } from "./cart.types";
import { setIsCartOpen, setCartItems } from "./cart.action";
import { AnyAction } from "redux";


export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
    readonly cartCount: number;
    readonly cartTotal: number;
};

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};


export const cartReducer = (state: CartState = CART_INITIAL_STATE, action: AnyAction) => {

    if (setIsCartOpen.match(action)) {
        return { ...state, isCartOpen: action.payload };        
    }

    if (setCartItems.match(action)) {
        return { ...state, cartItems: action.payload };
    }

    return state;
};