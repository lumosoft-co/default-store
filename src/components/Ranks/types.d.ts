export interface IRank {
    handle: string;
    image: string;
    price: {
        price: string;
        listPrice: string
    }
    title: string;
}

export interface IRankCategory {
    categoryByHandle: {
        __typename: string;
        description: string;
        displayType: string;
        handle: string;
        products: IRank[];
        title: string;
    }
}