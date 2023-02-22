import { IFeature } from "../../types";

export const Feature = (props: IFeature) => {
    const { id, title, description, image } = props;
    return (
        <div className="grid grid-cols-2">
            <div className="details">
                <h1 className="background-clip font-display text-m-h1 sm:text-d-h2 text-3xl md:text-5xl lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
                <div className="h-5" />
                <h2 className="text-custom-gray-300 font-semibold">{description}</h2>
                <button className="text-custom-gray-100 button-background focus:outline-none focus:ring-4 font-black rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => console.log(id)}>More Details</button>
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