import { IFeature } from "../../types";

export const Feature = (props: IFeature) => {
    const { id, title, description, image } = props;
    return (
        <div className="grid grid-cols-2">
            <div className="details">
                <h1 className="background-clip font-display text-m-h1 sm:text-d-h2 text-3xl md:text-5xl lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
                <div className="h-5" />
                <h2 className="text-custom-gray-300">{description}</h2>
                <button onClick={() => console.log(id)}>More Details</button>
            </div>
            <div className="image-holder">
                <img
                    className="image"
                    src={image}
                    alt={title}
                />
            </div>
        </div>
    )
}