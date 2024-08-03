import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword ] = useState("")

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
				<input type ="text" placeholder="Enter Email" value = {email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Enter Password" value = {password} onChange={(e) => setPassword(e.target.value)} /> />
				<button>Login</button>
			</div>
			
		</div>
	);
};
