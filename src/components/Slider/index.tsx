import { useState, useEffect, useMemo } from "react";
import { IFeature, } from "./types";
import { Feature } from "./components/Feature";
import { getContext } from "../../graphql";

import { useQuery } from "urql";
import { PRODUCTS_BY_TAG } from "../../graphql";

export const Slider = () => {
    const [page, setPage] = useState<number>(0);
    const [features, setFeatures] = useState<IFeature[] | null>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: PRODUCTS_BY_TAG,
        variables: {
            tag: "slideshow"
        },
        context: useMemo(() => {
            return getContext();
        }, [])
    });

    const handlePageChange = (page: number) => {
        if (features === null) {
            return;
        }
        if (page < 0) {
            setPage(features.length - 1);
            return;
        }
        if (page >= features.length) {
            setPage(0);
            return;
        }
        setPage(page);
    }

    useEffect(() => {
        if (data === undefined || error !== undefined || fetching) {
            return;
        }
        console.log(data);
        setFeatures(data.productsByTag);
    }, [data, error, fetching]);

    useEffect(() => {
        if (features === null) {
            return;
        }
        const timer = setInterval(() => {
            setPage((page + features.length + 1) % features.length);
        }, 5000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <section className="slideshow">
            { features !== null ?
                features.map((feature: IFeature, i: number) => {
                    return (
                        <div className={"content" + (i < page ? " before" : i > page ? " after" : "")}>
                            <Feature
                                {...feature}
                            />
                        </div>
                    )
                })
                : <div>Loading...</div>
            }
            <div className="buttons flex flex-row">
                <button className="mr-3" onClick={() => handlePageChange(page - 1)}>
                    <svg onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isHovered ? "#F0F0F0" : "#E0E8FE"}  className="w-10 h-10">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex flex-row justify-center items-center">
                    {features !== null ?features.map((feature: IFeature, i: number) => {

                        return (
                            <>
                            { // TODO put color for selected
                                page === i ? <div className="bg-custom-gray-200 ml-1 mr-1 rounded-full w-1 h-1"/>
                                    : <div className="bg-custom-gray-700 ml-1 mr-1 rounded-full w-1 h-1"/>  
                            }
                            </>
                        )
                    }): <div>Loading ...</div>}
                </div>
                <button className="ml-3" onClick={() => handlePageChange(page + 1)}>

                    <svg onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isHovered ? "#F0F0F0" : "#E0E8FE"} className="w-10 h-10">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </section>
    )
}