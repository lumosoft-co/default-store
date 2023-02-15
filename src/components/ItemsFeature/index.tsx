import { useQuery } from "urql"
import { IFeatureProps } from "./types"
import { IFeatureItem } from "./components/Card/types"
import { useMemo } from "react"

import { getContext } from "../../graphql"
import { Card } from "./components/Card";

export const ItemsFeature = (props: IFeatureProps) => {
    const { title, caption, query, variables, field } = props;

    const [{data, fetching, error}, executeQuery] = useQuery({
        query: query,
        variables: variables,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    return (
        <section className="relative">
            <h1 className="font-display w-full text-m-h1 sm:text-d-h2 text-3xl md:text-5xl text-light-gray-500 lg:text-[length:64px] xl:text-d-j font-black">{title}</h1>
            <div className="h-2"/>
            <h2>{caption}</h2>
            <div className="h-5"/>
            <div className={`grid grid-cols-4 gap-4 place-items-center`}>
                {(!fetching && !error) ? data[field].map((item: IFeatureItem, i: number) => {
                    return (
                        <Card 
                            key={i}
                            {...item}
                        />
                    )
                }) : <div>Loading...</div>}
            </div>
        </section>
    )
}