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
            <button onClick={() => handleCartAdd()} data-modal-hide="defaultModal" type="button" className="text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Add To Cart</button>
        </>
    )
}