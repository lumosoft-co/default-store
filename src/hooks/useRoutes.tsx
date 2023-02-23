import { CATEGORIES_QUERY, CATEGORY_QUERY } from "../graphql";
import { useQuery } from "urql";
import { useMemo, useState, useEffect } from "react";
import { getContext } from "../graphql";
import { RouteProps } from "react-router-dom";

import {
    Home,
    Products
} from '../pages';

export interface ISubCategory {
    handle: string;
    title: string;
    description: string;
}

export interface ICategory {
    handle: string;
    title: string;
    description: string
    subcategories: ISubCategory[];
}

export interface ICategories {
    categories: ICategory[];
}

const useRoutes = (createPages: boolean): [routes: RouteProps[], fetching: boolean] => {
    const [routes, setRoutes] = useState<RouteProps[]>([
        {
            path: '/',
            element: <Home />
        }
    ]);

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CATEGORIES_QUERY,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    useEffect(() => {
        if (data === null || fetching || error !== undefined || !createPages) {
            return;
        }
        const response = data as ICategories;

        const parentCategoryArray: RouteProps[] = response.categories.map((category: ICategory) => {return {
            path: `${category.handle}`,
            element: <Products
                        title={category.title}
                        caption={category.description}
                        query={CATEGORY_QUERY}
                        variables={{category: `${category.handle}`}}
                        field={"categoryByHandle.products"}
                        />

        }});

        // TODO do subcategories later

        setRoutes([
            ...routes,
            ...parentCategoryArray
        ]);
    }, [data, fetching, error]);

    return [routes, fetching];
}

export default useRoutes;