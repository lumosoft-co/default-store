import { ISearchContext, SearchContext } from "../../../../context/SearchContext";
import { AddToCart } from "../../../AddToCart";
import { ItemDetails } from "../../../ItemDetails";
import { IFeatureItem } from "./types";

import { useState, useContext, useEffect } from "react";

export const Card = (props: IFeatureItem) => {
    const { updateItems } = useContext(SearchContext) as ISearchContext;

    const { id, title, price, image, handle } = props;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    useEffect(() => {
        updateItems(props);
    }, [props]);

    return (
        <div className="px-7 py-5 relative bg-card-background-500 rounded-3xl border-[7px] border-custom-purple-600 h-[20rem]">
            <div className="absolute text-sm left-0 top-0 pt-1 pl-1 pr-2 pb-2 bg-custom-purple-600 rounded-br-2xl rounded-tl-2xl text-custom-gray-100 text-opacity-90 font-black">
                {(price.price === '0.00') ? "Free" : `$${price.price}`}
            </div>
            <a onClick={() => setViewDetails(true)} className="absolute right-0 top-0 p-2 rounded-lg text-custom-gray-200 cursor-pointer font-black hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                </svg>
            </a>
            <img
                className="object-contain h-48 w-40"
                src={image}
                alt={title}
            />
            <div className="h-2"/>
            <h3 className="font-black opacity-70 text-custom-gray-100 w-100 text-md text-center">{title}</h3>
            <div className="h-2"/>
            <AddToCart
                card={true}
                productId={id}
                quantity={1}
            />
            <ItemDetails
                productId={id}
                handle={handle}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
            />
        </div>
    )
}