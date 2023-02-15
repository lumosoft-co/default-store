import { useQuery } from "urql";
import { useMemo } from "react";
import { getContext } from "../../graphql";

const Ranks = () => {

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CART_SIZE_QUERY,
        variables: {
            cart: cart ?? "",
        },
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    return (
        <div></div>
    )
}