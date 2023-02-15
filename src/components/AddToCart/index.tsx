import { useMutation } from "urql";
import { IAddToCartProps } from "./types"
import { CART_CREATE, CART_LINE_ADD } from "../../graphql";
import { useContext } from "react";

import { CartContext, ICartContext } from "../../context/CartContext";
import { UserContext, IUserContext, IUser } from "../../context/UserContext";
import { LoginContext, ILoginContext } from "../../context/LoginContext";

export const AddToCart = (props: IAddToCartProps) => {
    const { cart, updateCart } = useContext(CartContext) as ICartContext;
    const { user, updateUser } = useContext(UserContext) as IUserContext;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;

    const { productId, quantity, country } = props;
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
            }).then((res) => {
                const id = res.data as string;
                updateCart(id);
            });
        } else {
            // add to cart from id
            addToCartMutation({
                cartId: cart,
                productId: productId,
                quantity: quantity,
            });
        }
    }
    return (
        <>
            <button onClick={() => handleCartAdd()}>Add to cart.</button>
        </>
    )
}