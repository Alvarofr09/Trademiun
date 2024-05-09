import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { loginRoute, userApi } from "../api/APIRoutes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
	const navigate = useNavigate();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 5000,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	};
	let userStorage = JSON.parse(localStorage.getItem("token") || null);

	const [auth, setAuth] = useState(userStorage);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		localStorage.setItem("token", JSON.stringify(auth));
	}, [auth]);

	async function login(user) {
		const { email, password } = user;

		const { data } = await userApi.post(loginRoute, {
			email,
			password,
		});

		console.log(data);

		if (data.status === false) {
			toast.error(data.msg, toastOptions);
			setErrorMessage("Error al introducir credenciales");
		} else {
			setAuth(data.token);
			setErrorMessage("");
			toast.success(data.msg, toastOptions);
		}
	}

	function logout() {
		setAuth(null);
		localStorage.removeItem("token");
		navigate("/login");
	}

	const value = { auth, login, logout, errorMessage };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
