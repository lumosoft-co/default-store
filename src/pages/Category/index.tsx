import { useParams } from "react-router-dom";
import { getContext } from "../../graphql";
import { useMemo, useState } from "react";
import { CATEGORY_QUERY, PRODUCT_QUERY } from "../../graphql";
import { useQuery, useMutation } from "urql";

export const CategoryProducts = () => {
    const params = useParams();
    const handle = params.handle;

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CATEGORY_QUERY,
        variables: {
            category: handle,
        },
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    if (fetching) return <div>Loading ...</div>
    if (error) return <div>Oops! An error occured!</div>

    const handleAddProduct = (productId: string) => {
       // const data useMutation
    }

    return (
        <div></div>
    )
}