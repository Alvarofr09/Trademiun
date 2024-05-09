import { createContext, useState, useContext, useEffect, useRef } from "react";
import { getAllGroups, host, userApi } from "../api/APIRoutes";
import { jwtDecode } from "jwt-decode";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext"; // Importa el contexto de autenticación
import { toast } from "react-toastify";

export const ChatContext = createContext({});

export const useChatContext = () => {
	return useContext(ChatContext);
};

export default function ChatContextProvider({ children }) {
	const { auth } = useAuthContext(); // Obtiene la información de autenticación del contexto AuthContext
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentUser, setCurrentUser] = useState(undefined);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			if (!auth) return; // Evita ejecutar la lógica si el usuario no está autenticado

			setCurrentUser(jwtDecode(auth)); // Decodifica el token de autenticación para obtener el usuario actual
			setIsLoaded(true);

			try {
				const response = await userApi.get(
					`${getAllGroups}/${jwtDecode(auth).id}`
				);
				console.log(response.data.groups);
				if (response.data.groups.length > 0) {
					setContacts(response.data.groups);
				}
			} catch (error) {
				console.error("Error fetching contacts:", error);
				toast.error("Error fetching contacts. Please try again.", {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					theme: "dark",
				});
			}
		};

		fetchData();
	}, [auth]);

	useEffect(() => {
		if (currentChat) {
			socket.current = io(host);
			socket.current.emit("add-user", currentChat.id);
		}
	}, [currentChat]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	const chatContextValue = {
		contacts,
		currentUser,
		currentChat,
		isLoaded,
		handleChatChange,
	};

	return (
		<ChatContext.Provider value={chatContextValue}>
			{children}
		</ChatContext.Provider>
	);
}
