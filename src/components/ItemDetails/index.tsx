import { Modal } from "@mui/material";
import { useState, useMemo } from "react";
import { IFeatureItem } from "../ItemsFeature/components/Card/types";
import { PRODUCT_QUERY } from "../../graphql";
import { useQuery } from "urql";

import { getContext } from "../../graphql";
import { AddToCart } from "../AddToCart";

interface IItemDetailsProps { 
    handle: string;
    productId: string;
    viewDetails: boolean;
    setViewDetails: (state: boolean) => void;
}

export const ItemDetails = (props: IItemDetailsProps) => {
    const { handle, viewDetails, setViewDetails, productId } = props;

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: PRODUCT_QUERY,
        variables: {
            product: handle
        },
        context: useMemo(() => {
            return getContext();
        }, [])
    });

    const details = data as IItemDetails;
    return (
        <div className="items-center justify-center flex">
            <Modal
                open={viewDetails}
                onClose={() => setViewDetails(false)}
            >
                <section className="relative w-full h-full mx-auto max-w-2xl flex justify-center items-center">
                    <div className="relative bg-theme-color-500 rounded-lg shadow border border-custom-gray-500">
                    { !fetching && details !== undefined ?
                      <>
                        <div className="flex items-start justify-between p-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {details.productByHandle.title}
                            </h3>
                            <button type="button" onClick={() => setViewDetails(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <span dangerouslySetInnerHTML={{__html: details.productByHandle.description}}/>
                        </div>
                        <div className="flex items-center p-6">
                            <AddToCart
                                productId={productId}
                                quantity={1}
                                card={false}
                            />
                        </div>
                        </>
                        : <div>Loading...</div>}
                    </div>
                </section>
            </Modal>
        </div>
    )
}