import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	getAllGroupsOfUser,
	getAllGroupsOfUserByName,
	host,
	userApi,
} from "../api/APIRoutes";
import Contacts from "../components/Chat/Contacts";
import { ToastContainer } from "react-toastify";
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

	const handleSearch = async (groupName) => {
		try {
			let data;

			if (groupName === "") {
				const response = await userApi.get(`${getAllGroupsOfUser}/${user.id}`);
				data = response.data;
			} else {
				const response = await userApi.get(
					`${getAllGroupsOfUserByName}/${user.id}/${groupName}`
				);
				data = response.data;
			}

			setContacts(data.groups);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoaded(true);

			try {
				const response = await userApi.get(`${getAllGroupsOfUser}/${user.id}`);

				setContacts(response.data.groups);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [navigate]);

	useEffect(() => {
		console.log(currentChat);
		if (currentChat) {
			socket.current = io(host);
			socket.current.emit("add-user", currentChat.group_id);
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
					<div className="basis-8/12 border-x-2 border-black dark:border-white mx-auto h-screen ">
						{isLoaded && currentChat === undefined ? (
							<Welcome />
						) : (
							<ChatContainer currentChat={currentChat} socket={socket} />
						)}
					</div>
					<div className="basis-4/12 mx-auto h-full">
						<Contacts
							handleSearch={handleSearch}
							contacts={contacts}
							changeChat={handleChatChange}
						/>
					</div>
				</>
			)}

			<ToastContainer />
		</div>
	);
}
