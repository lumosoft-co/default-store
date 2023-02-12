import { useMutation } from "urql";
import { IAddToCartProps } from "./types"
import { CART_CREATE, CART_LINE_ADD } from "../../graphql";

export const AddToCart = (props: IAddToCartProps) => {
    const { productId, quantity } = props;

    const cartCreate = useMutation(CART_CREATE);
    const addToCart = useMutation(CART_LINE_ADD);

    const cartCreateMutation = cartCreate[1];
    const addToCartMutation = addToCart[1];
    const handleCartAdd = (): void => {
        const cartId = localStorage.getItem("cart");
        if (cartId === null) {
            // Create a mutation
            cartCreateMutation({
                ...props
            }).then((res) => {
                const id = res.data as string;
                localStorage.setItem("cart", id);
            });
        } else {
            // add to cart from id
            addToCartMutation({
                cartId: cartId,
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