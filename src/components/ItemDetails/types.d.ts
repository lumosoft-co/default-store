interface IItemDetails {
    productByHandle: {
        title: string;
        description: string;
        price: {
            price: string;
            listPrice: string;
            purchaseTypes: string
        };
        image: string;
    }
}