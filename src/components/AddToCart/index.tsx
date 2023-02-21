import { useMutation } from "urql";
import { IAddToCartProps } from "./types"
import { CART_LINE_ADD } from "../../graphql";
import { useContext } from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { LoginContext, ILoginContext } from "../../context/LoginContext";

import { getContext } from "../../graphql";

export const AddToCart = (props: IAddToCartProps) => {
    const { cartID, cart, updateCart } = useContext(CartContext) as ICartContext;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;

    const { productId, quantity } = props;

    const addToCart = useMutation(CART_LINE_ADD);
    const addToCartMutation = addToCart[1];

    const handleCartAdd = (): void => {
        console.log("addinig to cart")
        if (cartID == null) {
            setShowLogIn(true); // Show log-in modal
            return;
        }
        // Add to cart from cartID
        addToCartMutation({
            cartId: cartID,
            productId: productId,
            quantity: quantity,
        }, getContext());
    }
    return (
        <>
            <button onClick={() => handleCartAdd()}>Add to cart.</button>
        </>
    )
}