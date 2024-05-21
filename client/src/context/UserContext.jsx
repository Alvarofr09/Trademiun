import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "./AuthContext";

export const UserContext = createContext({});

export const useUserContext = () => {
	return useContext(UserContext);
};

export default function UserContextProvider({ children }) {
	const { auth } = useAuthContext();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (auth) {
			console.log("Auth:", auth);
			try {
				const decodedUser = jwtDecode(auth);
				setUser(decodedUser);
			} catch (error) {
				console.error("Error decoding token:", error);
			}
		} else {
			console.log("No auth");
			setUser(null); // Reset user when auth is null
		}
	}, [auth]);

	const updateUser = (updatedUser) => {
		setUser(updatedUser);
	};

	const value = { user, updateUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
