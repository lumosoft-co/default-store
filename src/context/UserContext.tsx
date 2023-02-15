import React, { ReactElement } from "react";

export interface IUser {
    username: string;
    id: string
}

export interface IUserContext {
    user: string | null;
    updateUser: (user: string | null) => void;
}

export const UserContext = React.createContext<IUserContext | null>(null);

const UserProvider = ({ children }: any) => {
    const [user, setUser] = React.useState<string | null>(localStorage.getItem("user"));

    const updateUser = (user: string | null) => {
        if (user != null) {
            localStorage.setItem("user", user);
        } else {
            localStorage.removeItem("user");
        }
        setUser(user);
    }
    
    return (
        <UserContext.Provider value={{ user, updateUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;