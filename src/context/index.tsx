import CartProvider from "./CartContext"
import LoginProvider from "./LoginContext"
import UserProvider from "./UserContext"
import CountryProvider from "./CountryContext"

const AppProvider = ({ children }: any) => {
    return (
        <CartProvider>
            <LoginProvider>
                <UserProvider>
                    <CountryProvider>
                        {children}
                    </CountryProvider> 
                </UserProvider>
            </LoginProvider>
        </CartProvider>
    )
}

export default AppProvider;