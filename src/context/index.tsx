import CartProvider from "./CartContext"
import LoginProvider from "./LoginContext"

const AppProvider = ({ children }: any) => {
    return (
        <CartProvider>
            <LoginProvider>
                    {children}
            </LoginProvider>
        </CartProvider>
    )
}

export default AppProvider;