import { Modal } from "@mui/material";
import { useState, useMemo } from "react";
import { IFeatureItem } from "../ItemsFeature/components/Card/types";
import { PRODUCT_QUERY } from "../../graphql";
import { useQuery } from "urql";

import { getContext } from "../../graphql";

interface IItemDetailsProps { 
    handle: string;
    viewDetails: boolean;
    setViewDetails: (state: boolean) => void;
}

export const ItemDetails = (props: IItemDetailsProps) => {
    const { handle, viewDetails, setViewDetails } = props;

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
        <>
            <Modal
                open={viewDetails}
                onClose={() => setViewDetails(false)}
            >
                <section className="relative w-full h-full mx-auto max-w-2xl md:h-auto">
                    <div className="relative bg-theme-color-500 rounded-lg shadow">
                    { !fetching && details !== undefined ?
                      <>
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-custom-purple-500">
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
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                            <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                        </div>
                        </>
                        : <div>Loading...</div>}
                    </div>
                </section>
            </Modal>
        </>
    )
}