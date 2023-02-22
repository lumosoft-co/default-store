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
            <button onClick={() => handleCartAdd()} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Add To Cart</button>
        </>
    )
}