import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
// import {useHistory} from react-Router
import { useNavigate } from "react-router-dom";
import { Route, Router } from "react-router-dom";


export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [password, setPassword ] = useState("")
	const token = {sessionStorage: getItem("login")};
	const history = useNavigate();


	console.log("this is you token", store.token);
 	const handelonclick = () => {
		actions.login(email,password).then(() => {
			history("/")

		})
	};
	if(store.token && store.token != ""  && store.token != undefined) history("/");

			//[[[[[[[[[ LEFT OFF MIN 46:18 OF VIDEO]]]]]]]]]]]]]]]

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			{(store.token && store.token!="" && store.token!=undefined) ? "you are logged in with this token" + store.token :
			<div>
				<input type ="text" placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Password" value = {password} onChange={(e) => setPassword(e.target.value)} />
				<button onClick={handelonclick}>Login</button>
			</div>
				}
			
		</div>
	);
};
