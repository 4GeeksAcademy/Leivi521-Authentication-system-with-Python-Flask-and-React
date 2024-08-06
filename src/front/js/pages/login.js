import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);

    const handleLoginClick = async () => {
        const opts = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const resp = await fetch("https://laughing-barnacle-g4xw4g5wxg5w2pp6j-3001.app.github.dev/login", opts);
            if (resp.status === 200) {
                const data = await resp.json();
                sessionStorage.setItem("token", data.access_token);
                setToken(data.access_token);
            } else {
                console.error("Login failed", resp.statusText);
            }
        } catch(error) {
            console.error("There has been an error logging in", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Login</h1>
            {token ? (
                <div>"You are logged in with this token" {token}</div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLoginClick}>Login</button>
                </div>
            )}
        </div>
    );
};

export default Login;
