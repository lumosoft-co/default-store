export interface ICartItem {
    id: string;
    product: {
        title: string;
        handle: string;
        image: string;
    }
}

export interface ICart {
    items: ICartItem[];
}