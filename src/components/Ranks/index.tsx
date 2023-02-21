import { useQuery } from "urql";
import { useMemo } from "react";
import { getContext } from "../../graphql";
import { CATEGORY_QUERY } from "../../graphql";
import { IRankCategory } from "./types";

const RANKS = "ranks";

export const Ranks = () => {
    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CATEGORY_QUERY,
        variables: {
            category: RANKS,
        },
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    const ranks = data as IRankCategory
    return (
        <section>
            <h1 className="font-display text-light-gray-500 w-full text-m-h1 sm:text-d-h2 text-3xl md:text-5xl text-light-gray-500 lg:text-[length:64px] xl:text-d-j font-black">{ranks != null ? ranks.categoryByHandle.title : "Loading ..."}</h1>
            <div className="h-2" />
            <h2>{ranks != null ? ranks.categoryByHandle.description : "Loading ..."}</h2>
            <div className="h-5" />
            {!fetching && error === null ?
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Commands</th>
                            {ranks.categoryByHandle.products.map((rank) => {
                                return <th key={`${rank}`}>
                                        {rank.title}
                                    </th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {ranks.categoryByHandle.products.map((rank, i) => {
                                return <td key={`${rank}${i}`}>
                                        {rank.title}
                                    </td>
                            })}
                        </tr>
                    </tbody>
                </table>
                :
                <div></div>
            }
        </section>
    )
}