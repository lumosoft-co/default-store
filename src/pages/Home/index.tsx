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

export const Home = () => {
    const { showLogIn, setShowLogIn } = useContext(LoginContext) as ILoginContext;

    const [showCart, setShowCart] = useState<boolean>(false);

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
                    showCart={() => setShowCart(true)}
                    showLogin={() => setShowLogIn(true)}
                />
                {showCart ?
                    <section className="">
                        <Cart />
                    </section> : <></>}
                <div className="h-10" />
                <ItemsFeature
                    title="Popular Items"
                    caption="Explore the community's most loved items"
                    query={POPULAR_ITEMS}
                    field={"topProducts"}
                />
                <Ranks />
            </div>
        </div>
    )
}