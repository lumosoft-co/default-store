import { useQuery } from "urql"
import { IFeatureProps } from "./types"
import { IFeatureItem } from "./components/Card/types"
import { useMemo } from "react"

import { getContext } from "../../graphql"
import { Card } from "./components/Card";

const byString = (o: any , s: string): any => {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return null;
        }
    }
    return o;
}

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
            <h1 className="background-clip font-display text-custom-gray-300 w-full text-m-h1 sm:text-d-h2 text-3xl md:text-5xl text-light-gray-500 lg:text-[length:64px] xl:text-d-j font-black"><span className="title">{title}</span></h1>
            <div className="h-2"/>
            <h2 className="text-custom-gray-300 font-semibold">{caption}</h2>
            <div className="h-5"/>
            <div className={`grid grid-cols-5 gap-10 place-items-center`}>
                {(!fetching && !error) ? byString(data, field)?.map((item: IFeatureItem, i: number) => {
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