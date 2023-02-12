import { useState } from "react";
import { 
    Navigation,
    Cart
} from "../../components";

export const Home = () => {
    const [showCart, setShowCart] = useState<boolean>(false);
    return (
        <div>
            <Navigation
                showCart={() => setShowCart(true)}
            />
            {showCart ? 
            <section className="">
                <Cart/>
            </section> : <></>}
            <section>

            </section>
            <section></section>
            <section></section>
        </div>
    )
}