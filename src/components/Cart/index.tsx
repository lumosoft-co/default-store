import { useMemo } from "react";
import { getContext } from "../../graphql";
import { useContext } from "react";

import { useQuery } from "urql"
import { CART_QUERY } from "../../graphql"
import { CartContext, ICartContext } from "../../context/CartContext";

export const Cart = () => {
    const { cart, updateCart } = useContext(CartContext) as ICartContext;

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CART_QUERY,
        variables: {
            cart: cart ?? ""
        },
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    return (
        <div>
            {error ?
                <div>
                    There is no cart.
                </div> :
                <div>
                    {data}
                </div>
            }

        </div>
    )
}