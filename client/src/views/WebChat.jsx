import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAllGroupsOfUser, host } from "../api/APIRoutes";
import Contacts from "../components/Chat/Contacts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./Welcome";
import ChatContainer from "../components/Chat/ChatContainer";
import { io } from "socket.io-client";

import { useUserContext } from "../context/UserContext";
import useDeviceType from "../hooks/useDeviceType";
import MobileContacts from "../components/Chat/MobileContacts";

export default function WebChat() {
	const isMobile = useDeviceType();
	const { user } = useUserContext();
	const socket = useRef();
	const navigate = useNavigate();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoaded(true);

			try {
				const response = await axios.get(`${getAllGroupsOfUser}/${user.id}`);
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
	}, [navigate]);

	useEffect(() => {
		if (currentChat) {
			socket.current = io(host);
			socket.current.emit("add-user", currentChat.id);
		}
	}, [currentChat]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<div className="h-full centered  bg-white">
			{isMobile ? (
				<MobileContacts contacts={contacts} socket={socket} />
			) : (
				<>
					<div className="basis-8/12 border-x-2 border-black mx-auto h-screen ">
						{isLoaded && currentChat === undefined ? (
							<Welcome />
						) : (
							<ChatContainer currentChat={currentChat} socket={socket} />
						)}
					</div>
					<div className="basis-4/12 mx-auto h-full">
						<Contacts contacts={contacts} changeChat={handleChatChange} />
					</div>
				</>
			)}

			<ToastContainer />
		</div>
	);
}
