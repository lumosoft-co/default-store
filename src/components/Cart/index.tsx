import { useMemo } from "react";
import { getContext } from "../../graphql";

import { useQuery } from "urql"
import { CART_QUERY } from "../../graphql"
import { useCart } from "../../hooks/useCart";

export const Cart = () => {
    const [cart, setCart] = useCart();

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CART_QUERY,
        variables: {
            cart: cart ?? ""
        },
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    console.log(data);
    return (
        <div>
            {error ?
                <div>
                    There is no cart.
                </div>: 
                <div>
                    {data}
                </div>
            }

        </div>
    )
}