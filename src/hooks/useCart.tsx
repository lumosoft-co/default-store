import { useEffect, useState } from "react"

interface IUseCartProps {
    cart: string;
}

export const useCart = (props?: IUseCartProps): [cartId: string | undefined, setCart: (cartId: string) => void] => {
    const [cart, setCart] = useState<string>();

    const setCartId = (cartId: string) => {
        localStorage.setItem("cart", cartId);
    }

    useEffect(() => {
        const cartId = localStorage.getItem("cart");

        if (props !== undefined) {
            setCart(props.cart);
            localStorage.setItem("cart", props.cart);
            return;
        }

        setCart(cartId ?? undefined);
    }, [props]);

    return [cart, setCartId];
}