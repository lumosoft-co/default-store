import { useContext, useState } from "react";
import {
    Navigation,
    Cart,
    Login,
    ItemsFeature,
    Ranks
} from "../../components";
import { POPULAR_ITEMS } from "../../graphql";
import { Modal } from "@mui/material";
import { ILoginContext, LoginContext } from "../../context/LoginContext";
import { Slider } from "../../components";

export const Home = () => {
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;
    return (
        <div className="relative mx-auto max-w-[90rem] h-100">
            <div className="w-[70rem] h-[70rem] opacity-30 absolute radial-background top-[-10rem] left-[30rem]"/>
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
                <Slider/>
                <div className="h-16"/>
                <ItemsFeature
                    title="Popular Items"
                    caption="Explore the community's most loved items"
                    query={POPULAR_ITEMS}
                    field={"topProducts"}
                />
                <Cart/>
                <div className="h-12"/>
            </div>
        </div>
    )
}