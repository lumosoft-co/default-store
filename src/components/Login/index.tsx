import { useState, useContext } from "react";
import { UserContext, IUserContext } from "../../context/UserContext";

export interface IUser {
    username: string;
    id: string;
}

export function getUserFromName(username: string): Promise<[string | undefined, string | undefined]> {
    return fetch(
        `https://playerdb.co/api/player/minecraft/${username}`,
        {
            mode: "cors"
        })
        .then(out => out.json())
        .catch(e => { return {} as any })
        .then(res => {
            const id = res?.data?.player?.id
            const name = res?.data?.player?.username
            if (id && name && name.toLowerCase() === username.toLowerCase()) {
                return [name, id];
            }
            return [undefined, undefined];
        });
}

export const Login = () => {
    const { user, updateUser } = useContext(UserContext) as IUserContext;

    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (): void => {
        setLoading(true);
        const user = getUserFromName(input);
        user.then(([name, id]) => {
            if (name === undefined || id === undefined) {
                setError("Please enter a valid username.");
                return;
            }
            const user = JSON.stringify({
                username: name,
                id: id
            });
            updateUser(user); // Update user context

            setSuccess("Successfully logged in!");
            setLoading(false)
        });
    };
    
    return (
        <section className="relative mx-auto max-w-[90rem] h-100">
            <div className="bg-white rounded-xl p-14">
                <h1>Login</h1>
                <input
                    className=""
                    placeholder="Enter your username"
                    onChange={(e) => setInput(e.target.value)}
                />
                <span>{error !== "" ? error : success}</span>
                <button disabled={loading} className="rounded-lg p-5 bg-agora-300 text-agora-500" onClick={() => handleLogin()}>{loading ? "Loading..." : "Login"}</button>
            </div>
        </section>
    )
}