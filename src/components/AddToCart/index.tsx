import { useMutation } from "urql";
import { IAddToCartProps, ICartCreate } from "./types"
import { CART_CREATE, CART_LINE_ADD } from "../../graphql";
import { useContext } from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { UserContext, IUserContext, IUser } from "../../context/UserContext";
import { LoginContext, ILoginContext } from "../../context/LoginContext";
import { CountryContext, ICountryContext } from "../../context/CountryContext";

import { getContext } from "../../graphql";

export const AddToCart = (props: IAddToCartProps) => {
    const { cart, updateCart } = useContext(CartContext) as ICartContext;
    const { user, updateUser } = useContext(UserContext) as IUserContext;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext; 
    const { country, setCountry} = useContext(CountryContext) as ICountryContext;

    const { productId, quantity } = props;
    const userObject: IUser | null = (user ? JSON.parse(user) : null) as IUser;

    const cartCreate = useMutation(CART_CREATE);
    const addToCart = useMutation(CART_LINE_ADD);

    const cartCreateMutation = cartCreate[1];
    const addToCartMutation = addToCart[1];

    const handleCartAdd = (): void => {
        if (user == null) {
            setShowLogIn(true); // Show log in modal
            return;
        }

        if (cart === null) {
            // Create a mutation
            cartCreateMutation({
                ign: userObject.username,
                uuid: userObject.id,
                country: country,
                productId: productId,
                quantity: quantity
            }, getContext()).then((res) => {
                const cart = res.data as ICartCreate;
                updateCart(cart.cartCreate.id);
            });
        } else {
            // add to cart from id
            addToCartMutation({
                cartId: cart,
                productId: productId,
                quantity: quantity,
            }, getContext());
        }
    }
    return (
        <>
            <button onClick={() => handleCartAdd()}>Add to cart.</button>
        </>
    )
}