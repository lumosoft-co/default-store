import { IFeature } from "../../types";

export const Feature = (props: IFeature) => {
    const { id, title, description, image } = props;
    return (
        <div className="grid grid-cols-2">
            <div className="details">
                <h1>{title}</h1>
                <div className="h-5" />
                <h2>{description}</h2>
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