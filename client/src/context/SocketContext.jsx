import { createContext, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { host } from "../api/APIRoutes";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
	const socket = useRef();

	useEffect(() => {
		socket.current = io(host);
		return () => {
			socket.current.disconnect();
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
