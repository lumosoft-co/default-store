import { IFeature } from "../../types";

export const Feature = (props: IFeature) => {
    const { id, title, caption, image } = props;
    return (
        <div className="grid grid-cols-2">
            <div>
                <h1>{title}</h1>
                <div className="h-5" />
                <h2>{caption}</h2>
                <button onClick={() => console.log(id)}>More Details</button>
            </div>
            <div>
                <img
                    className="object-contain h-48 w-11"
                    src={image}
                    alt={title}
                />
            </div>
        </div>
    )
}