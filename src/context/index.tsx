import CartProvider from "./CartContext"
import LoginProvider from "./LoginContext"
import UserProvider from "./UserContext"

const AppProvider = ({ children }: any) => {
    return (
        <CartProvider>
            <LoginProvider>
                <UserProvider>
                    {children}
                </UserProvider>
            </LoginProvider>
        </CartProvider>
    )
}

export default AppProvider;