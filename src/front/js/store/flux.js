import { Login } from "../pages/login";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// // Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			syncTokenFromSessionStore: () => {
				sessionStorage.getItem("token");
				console.log("logging out")
				setStore({token: null})

			},
			logout: () => {
				const token = sessionStorage.removeitem("token");
				console.log("Application has loaded, syncing the session storage token")
				if(token && token != ""  && token != undefined)setStore({token: token})

			},

			Login: async(email,password) => {
				const opts = {
					Method: 'POST',
					body: JSON.stringify({
						"email": email,
						"password": password,
						"headers": {
							"content-type": "application/json"
						},
					})
		
		
		
				}
					const resp = await fetch("https://laughing-barnacle-g4xw4g5wxg5w2pp6j-3001.app.github.dev/user/login", opts)
						if(resp.status !== 200) {



						alert("huston we have a problem!");
						return false;
						}

						const data = await resp.json();
						console.log("this came from the back end", data)
						sessionStorage.setItem("token", data.access_token);
						setStore({token: data.access_token})
						return true
					},

					catch(error){
						console.log("there has been an error logging in")
					},

					getMessage: () => {
						const store = getStore();
						const opts = {
							headsers: {
								"Authorization": " Bearer" + store.token
							}
						}
						//fetching data from backend
					fetch("laughing-barnacle-g4xw4g5wxg5w2pp6j-3001.app.github.dev/api/hello",opts)
						.then(resp => resp.json())
						.then(data => setStore({message: data.message}))
						.catch(error => console.log("Error loading message from backend", error));
						


					},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
