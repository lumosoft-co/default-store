import { IProductsPageProps } from "./types";
import { useQuery } from "urql";
import { useContext, useMemo, useState } from "react";
import { CATEGORY_QUERY, getContext } from "../../graphql";
import { ILoginContext, LoginContext } from "../../context/LoginContext";
import {
    Login,
    Navigation,
    Cart,
    ItemsFeature
} from "../../components";

import { Modal } from "@mui/material";

export const Products = (props: IProductsPageProps) => {
    const { query, variables, title, caption, field } = props;
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;
    return (
        <div className="relative mx-auto max-w-[90rem] h-100">
            <div className="sm:px-6 lg:px-12 relative">
                <Modal
                    open={showLogIn}
                    onClose={() => setShowLogIn(false)}
                >
                    <Login />
                </Modal>
                <Navigation
                    showLogin={() => setShowLogIn(true)}
                />
                <Cart />
                <ItemsFeature
                    title={title}
                    caption={caption}
                    query={query}
                    variables={variables}
                    field={field}
                />
            </div>
        </div>
    )
}