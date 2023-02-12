import { useMutation } from "urql";
import { IAddToCartProps } from "./types"
import { CART_CREATE, CART_LINE_ADD } from "../../graphql";

export const AddToCart = (props: IAddToCartProps) => {
    const { ign, uuid, country, productId, quantity } = props;

    const cartCreate = useMutation(CART_CREATE);
    const addToCart = useMutation(CART_LINE_ADD);
    const handleCartAdd = (): void => {
        const cartId = localStorage.getItem("cart");
        if (cartId === null) {
            // Create a mutation
            cartCreate[1]({
                ...props
            }).then((res) => {
                const id = res.data as string;
                localStorage.setItem("cart", id);
            });
        } else {
            // add to cart from id
            addToCart[1]({
                cartId: 
            })
        }
    }
    return (
        <div>
            <button>Add to cart.</button>
        </div>
    )
}