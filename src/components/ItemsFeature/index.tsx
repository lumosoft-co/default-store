import { useQuery } from "urql"
import { IFeatureProps } from "./types"
import { IFeatureItem } from "./components/Card/types"
import { useMemo } from "react"

import { getContext } from "../../graphql"
import { Card } from "./components/Card";

export const ItemsFeature = (props: IFeatureProps) => {
    const { title, caption, query, variables } = props;

    const [{data, fetching, error}, executeQuery] = useQuery({
        query: query,
        variables: variables,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    if (fetching) return <p>Loading...</p>
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <section>
            <h1>{title}</h1>
            <div className="h-2"/>
            <h2>{caption}</h2>
            <div className="h-5"/>
            <div className="grid grid-column-1 ">
                {data.map((item: IFeatureItem) => {
                    return (
                        <Card
                        {...item}
                        />
                    )
                })}
            </div>
        </section>
    )
}