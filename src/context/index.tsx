import CartProvider from "./CartContext"
import LoginProvider from "./LoginContext"
import SnackBarProvider from "./SnackBar";

const AppProvider = ({ children }: any) => {
    return (
        <CartProvider>
            <LoginProvider>
                <SnackBarProvider>
                    {children}
                </SnackBarProvider>
            </LoginProvider>
        </CartProvider>
    )
}

export default AppProvider;