import { useState } from "react";

import { ItemDetails } from "../../../ItemDetails";
import { IFeature } from "../../types";

const LENGTH = 150;

export const Feature = (props: IFeature) => {
    const { id, title, description, image, handle } = props;
    const [viewDetails, setViewDetails] = useState<boolean>(false);

    return (
        <div className="grid grid-cols-2 gap-20">
            <div className="details">
                <h1 className="background-clip font-display text-m-h1 sm:text-d-h2 text-3xl md:text-5xl lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
                <div className="h-5" />
                <h2 className="w-[88%] text-custom-gray-300 text-md md:text-xl font-medium"><span dangerouslySetInnerHTML={{__html: description.substring(0, LENGTH)}}/></h2>
                <div className="h-7"/>
                <button className="text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => setViewDetails(true)}>More Details</button>
            </div>
            <div className="image-holder relative flex items-center justify-center">
                <img
                    className="image"
                    src={image}
                    alt={title}
                />
            </div>
            <ItemDetails
                handle={handle}
                productId={id}
                viewDetails={viewDetails}
                setViewDetails={setViewDetails}
            />
        </div>
    )
}