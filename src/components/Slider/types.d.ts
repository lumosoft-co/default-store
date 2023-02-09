export interface IFeature {
    id: string;
    title: string;
    caption: string;
    image: string;
}

export interface ISliderProps {
    features: IFeature[];

}