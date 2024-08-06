import React, { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleSignupClick = async () => {
        const opts = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const resp = await fetch("https://curly-space-waddle-g4xw4g5wx97gcwvr4-3001.app.github.dev/api/user/signup", opts);
            if (resp.status === 201) {
                const data = await resp.json();
                setMessage(data.message);
            } else {
                const errorData = await resp.json();
                setMessage(errorData.msg);
            }
        } catch (error) {
            console.error("There has been an error during signup", error);
        }
    };

    return (
        <div className="text-center mt-5">
            <h1>Signup</h1>
            {message ? (
                <div>{message}</div>
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
                    <button onClick={handleSignupClick}>Signup</button>
                </div>
            )}
        </div>
    );
};

export default Signup;