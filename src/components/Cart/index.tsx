import { useContext } from "react";
import { Modal } from "@mui/material";

import { CartContext, ICartContext } from "../../context/CartContext";
import { CartItem } from "./components/CartItem";

export const Cart = () => {
    const {
        cartID,
        cart,
        cartOpen,
        updateCartOpen
    } = useContext(CartContext) as ICartContext;

    console.log(cart);

    return (
        <>
            {cartOpen ? 
                <section tabIndex={-1} className="absolute right-0 top-0 bottom-0 min-h-full w-2/5">
                    <div className="bg-white p-14 h-100">
                        {cartID === null ?
                            <div>
                                There is no cart.
                            </div> :
                            <div>
                                {
                                    cart !== null ? 
                                    <>
                                        <a className="cursor-pointer" onClick={() => updateCartOpen(false)}>Close</a>
                                        <h1>My Cart ({cart?.cart.items.length})</h1>
                                        <div className="">
                                            {cart.cart.items.map((item, i) => {
                                                return <CartItem
                                                            key={i}
                                                            {...item}
                                                        />
                                            })}
                                        </div>
                                        <h2>Total: {cart?.cart.cost.actual}</h2>
                                    </>
                                    :
                                    <>Loading...</>
                                }
                                
                            </div>
                        }
                    </div>
                </section>
                : <></>
            }
        </>
    )
}