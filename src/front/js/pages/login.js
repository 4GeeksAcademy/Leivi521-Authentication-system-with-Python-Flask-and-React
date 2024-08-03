import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword ] = useState("")

	const handelonclick = () => {
		const opts = {
			Method: 'POST',
			body: JSON.stringify({
				"email": "leivi521@gmail.com",
    			"password": "abcdefg"
			})



		}
			fetch("https://laughing-barnacle-g4xw4g5wxg5w2pp6j-3001.app.github.dev/token", opts)
			.then(resp => {
				if(resp.status === 200) return resp.json ();
				else alert("huston we have a problem!");
			})
			.then()
			.catch(error => {
				console.error("there was an error", error);
			})

			} 

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type ="text" placeholder="Enter Email" value = {email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Enter Password" value = {password} onChange={(e) => setPassword(e.target.value)} /> />
				<button onClick={handelclick}>Login</button>
			</div>
			
		</div>
	);
};
