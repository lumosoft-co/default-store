import React, { ReactElement } from "react";

export interface ICart {
    id: string;
}

export interface ICartContext {
    cart: string | null;
    updateCart: (id: string | null) => void;
}

export const CartContext = React.createContext<ICartContext | null>(null);

const CartProvider = ({ children }: any) => {
    const [cart, setCart] = React.useState<string | null>(localStorage.getItem("cart"));

    const updateCart = (cart: string | null) => {
        if (cart != null) {
            localStorage.setItem("cart", cart);
        } else {
            localStorage.removeItem("cart");
        }
        setCart(cart);
    }

    return (
        <CartContext.Provider value={{ cart, updateCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;