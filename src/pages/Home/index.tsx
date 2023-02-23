import { useContext, useMemo, useEffect, useState } from "react";
import {
    Navigation,
    Cart,
    Login,
    ItemsFeature,
    Ranks
} from "../../components";
import { POPULAR_ITEMS, CATEGORIES_QUERY, CATEGORY_QUERY } from "../../graphql";
import { Modal } from "@mui/material";
import { ILoginContext, LoginContext } from "../../context/LoginContext";
import { Slider } from "../../components";
import { getContext } from "../../graphql";
import { ICategories, ICategory } from "../../hooks/useRoutes";

import { useQuery } from "urql";

export const Home = () => {
    const [categories, setCategories] = useState<ICategories | null>(null);
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;

    const [{ data, fetching, error }, executeQuery] = useQuery({
        query: CATEGORIES_QUERY,
        context: useMemo(() => {
            return getContext();
        }, []),
    });

    useEffect(() => {
        if (data === null || fetching || error !== undefined) {
            return;
        }
        setCategories(data as ICategories);
    }, [data, fetching, error])
    return (
        <div className="relative mx-auto max-w-[90rem] h-100">
            <div className="w-[60rem] h-[60rem] absolute radial-background top-[-10rem] left-[50rem]" />
            <div className="w-[60rem] h-[60rem] absolute radial-background top-[30rem] left-[-10rem]" />
            <div className="sm:px-6 lg:px-12 relative z-50">
                <Modal
                    open={showLogIn}
                    onClose={() => setShowLogIn(false)}
                >
                    <Login />
                </Modal>
                <Navigation
                    showLogin={() => setShowLogIn(true)}
                />
                <Slider />
                <div className="h-14" />
                <ItemsFeature
                    title="Popular Items"
                    caption="Explore the community's most loved items"
                    query={POPULAR_ITEMS}
                    field={"topProducts"}
                />
                {categories !== null ? categories.categories.map((category: ICategory, i) => {
                    return (
                        <>
                            <div className="h-16" />
                            <div id={category.handle}>
                                <ItemsFeature
                                    key={i}
                                    title={category.title}
                                    caption={category.description}
                                    query={CATEGORY_QUERY}
                                    variables={{ category: `${category.handle}` }}
                                    field={"categoryByHandle.products"}
                                />
                            </div>
                        </>
                    )
                })
                    : <div>Loading...</div>
                }
                <Cart />
                <div className="h-12" />
            </div>
        </div>
    )
}