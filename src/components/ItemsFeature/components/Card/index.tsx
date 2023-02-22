import { AddToCart } from "../../../AddToCart";
import { ItemDetails } from "../../../ItemDetails";
import { IFeatureItem } from "./types";

import { useState } from "react";

export const Card = (props: IFeatureItem) => {
    const { id, title, price, image, handle } = props;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    return (
        <div className="px-10 py-5 relative">
            <div className="absolute left-0 top-0 p-5 rounded-lg">
                {price.price}
            </div>
            <img
              className="object-contain h-48 w-11"
              src={image}
              alt={title}
            />
            <h3>{title}</h3>
            <AddToCart
                productId={id}
                quantity={1}
            />
            <button onClick={() => setViewDetails(true)}>View Details</button>
            <ItemDetails
                productId={id}
                handle={handle}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
            />
        </div>
    )
}