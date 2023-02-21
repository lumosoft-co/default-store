import React, { useEffect, useMemo } from "react";
import { useQuery } from "urql";
import { CART_QUERY } from "../graphql";
import { getContext } from "../graphql";

export interface IUser {
    username: string;
    uuid: string;
}

export interface IItem {
    product: {
        handle: string;
        title: string;
        image: string;
    };
    quantity: number;
    cost: {
        actual: string;
    }
}

export interface ICart {
    cart: {
        identity: IUser;
        cost: { actual: number }
        discounts: string[];
        items: IItem[];
    }
}

export interface ICartContext {
    cartID: string | null;
    cart: ICart | null;
    cartOpen: boolean;
    updateCartOpen: (open: boolean) => void;
    updateCart: (id: string | null) => void;
}

export const CartContext = React.createContext<ICartContext | null>(null);

const CartProvider = ({ children }: any) => {
    const [cartID, setCartID] = React.useState<string | null>(localStorage.getItem("cart"));
    const [cartOpen, setCartOpen] = React.useState<boolean>(false);
    const [cart, setCart] = React.useState<ICart | null>(null);

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CART_QUERY,
        variables: {
            cart: cartID ?? "",
        },
        context: useMemo(() => {
            return getContext();
        }, [])
    });

    const updateCartOpen = (open: boolean) => {
        setCartOpen(open);
    }

    const updateCart = (id: string | null) => {
        if (id != null) {
            localStorage.setItem("cart", id);
        } else {
            localStorage.removeItem("cart");
        }
        setCartID(id);
        executeQuery({
            cart: id
        });
    }

    useEffect(() => {
        if (data === undefined || error !== undefined || fetching) {
            setCart(null); 
            return;
        }
        setCart(data as ICart);
    }, [data, error, fetching]);

    return (
        <CartContext.Provider value={{ cartID, cart, cartOpen, updateCart, updateCartOpen}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;