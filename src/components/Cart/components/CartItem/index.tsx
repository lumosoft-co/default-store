import { useContext, useState, useEffect, useCallback} from "react";
import { IItem } from "../../../../context/CartContext";
import { CartContext, ICartContext } from "../../../../context/CartContext";
import { useMutation } from "urql";
import {
    CART_LINE_ADD,
    CART_LINE_DELETE,
    CART_LINE_REMOVE,
    CART_LINE_UPDATE,
    getContext
} from "../../../../graphql";

import { UseMutationResponse, AnyVariables } from "urql";

export const CartItem = (props: IItem) => {
    const { cartID } = useContext(CartContext) as ICartContext;

    const [quantity, setQuantity] = useState<number | null>(null);

    const cartLineDeleteMutation = useMutation(CART_LINE_DELETE);
    const cartLineRemoveMutation = useMutation(CART_LINE_REMOVE);
    const cartLineAddMutation = useMutation(CART_LINE_ADD);
    const cartLineUpdateMutation = useMutation(CART_LINE_UPDATE);

    const handleDeleteItem = () => {
        cartLineDeleteMutation[1]({
            cartId: cartID,
            lineId: props.id
        }, getContext());
    }

    const handleCartProductMutation = useCallback((
        mutation: UseMutationResponse<any, AnyVariables>,
        quantity: number
    ) => {
        mutation[1]({
            cartId: cartID,
            productId: props.product.id,
            quantity: quantity
        }, getContext());
    }, [cartID, props]);

    useEffect(() => {
        if (quantity !== null) {
            cartLineUpdateMutation[1]({
                cartId: cartID,
                lineId: props.id,
                quantity: quantity
            }, getContext());
        }
    }, [quantity]);

    return (
        <div className="p-5 w-100 h-100 grid grid-cols-2 z-50 items-center">
            <div className="flex flex-row">
                <img alt={props.product.handle} src={props.product.image}></img>
                <div>
                    <h1>{props.product.title}</h1>
                    <div>{props.cost.list}</div>
                </div>
            </div>
            <div className="">
                <a className="cursor-pointer" onClick={handleDeleteItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </a>
                <div className="flex flex-row">
                    <button className="cursor-pointer" onClick={() => handleCartProductMutation(cartLineRemoveMutation, 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <input value={quantity !== null ? quantity : props.quantity} inputMode="numeric" onChange={(e) => { 
                        if (e.target.value === "") {
                            setQuantity(0);
                            return;
                        }
                        setQuantity(parseInt(e.target.value) as number)
                    }}/>
                    <button className="cursor-pointer z-50" onClick={() => handleCartProductMutation(cartLineAddMutation, 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}