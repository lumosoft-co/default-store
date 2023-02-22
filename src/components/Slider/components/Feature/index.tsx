import { IFeature } from "../../types";

export const Feature = (props: IFeature) => {
    const { id, title, description, image } = props;
    return (
        <div className="grid grid-cols-2">
            <div className="details">
                <h1 className="background-clip font-display text-m-h1 sm:text-d-h2 text-3xl md:text-5xl lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
                <div className="h-5" />
                <h2 className="text-custom-gray-300 font-semibold">{description}</h2>
                <button className="py-2.5 px-5 mr-2 mb-2 hover-cursor button-background -mt-[9px] md:-mt-[8px] inline-flex items-center cursor-pointer justify-center text-[14px] md:text-[16px] xl:text-d-p-lg h-11 box-border rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent font-black text-white-500 hover:bg-opacity-100 hover:text-custom-white-500 focus:bg-opacity-100 focus:text-custom-white-500 w-[90px] md:w-[118px] transition-colors duration-200 xl:order-1" onClick={() => console.log(id)}>More Details</button>
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