import { AddToCart } from "../../../AddToCart";
import { IFeatureItem } from "./types";

export const Card = (props: IFeatureItem) => {
    const { id, title, price, image } = props;
    return (
        <div className="px-10 py-5 relative">
            <div className="absolute left-0 top-0 p-5 rounded-lg">
                {price.price}
            </div>
            <img
              className="object-contain h-48 w-11 z-50"
              src={image}
              alt={title}
            />
            <h3>{title}</h3>
            
        </div>
    )
}