import { IFeatureItem } from "./types";

export const Card = (props: IFeatureItem) => {
    const { title, price, image } = props;
    return (
        <div className="px-10 py-5 border-">
            <div className="absolute left-0 top-0 p-5 rounded-lg">
                {price}
            </div>
            <img
              className="object-contain h-48 w-11 z-50"
              src={image}
              alt={title}
            />
            <h3>{title}</h3>
            <button className="">ADD TO CART</button>
        </div>
    )
}