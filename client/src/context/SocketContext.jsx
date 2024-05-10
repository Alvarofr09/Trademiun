import { createContext, useContext, useRef } from "react";

export const SocketContext = createContext({});

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export default function SoketContextProvider({ children }) {
	const socket = useRef();

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
}
