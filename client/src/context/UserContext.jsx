import { createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "./AuthContext";

export const UserContext = createContext({});

export const useUserContext = () => {
	return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
	const { auth } = useAuthContext();
	let user = null;

	if (auth) {
		try {
			user = jwtDecode(auth);
		} catch (error) {
			console.error("Error decoding token:", error);
		}
	}

	const value = { user };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
