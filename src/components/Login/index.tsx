import { useState } from "react";

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
        .catch(e => {return {} as any})
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
    const [input, setInput] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleLogin = (): void => {
        const user = getUserFromName(input);
        user.then(([name, id]) => {
            if (name === undefined || id === undefined) {
                setError("Please enter a valid username.");
                return;
            }
            localStorage.setItem("user", JSON.stringify({
                username: name,
                id: id
            }))
        })

    }
    return (
        <div className="">
            <h1></h1>
            <input
                className=""
                placeholder="Enter your username"
                onChange={(e) => setInput(e.target.value)}
            />
            <span>{error}</span>
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    )
}