/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useCallback } from "react";
import {
	getAllGroupsOfUser,
	getAllGroupsOfUserByName,
	userApi,
} from "../api/APIRoutes";
import Contacts from "../components/Chat/Contacts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./Welcome";
import ChatContainer from "../components/Chat/ChatContainer";

import { useUserContext } from "../context/UserContext";
import useDeviceType from "../hooks/useDeviceType";
import MobileContacts from "../components/Chat/MobileContacts";
import { useSocket } from "../context/SocketContext";

export default function WebChat() {
	const isMobile = useDeviceType();
	const { user } = useUserContext();
	const socket = useSocket();
	console.log("Socket en chat", socket);
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [isLoaded, setIsLoaded] = useState(false);

	const handleSearch = useCallback(
		async (groupName) => {
			try {
				const response =
					groupName === ""
						? await userApi.get(`${getAllGroupsOfUser}/${user.id}`)
						: await userApi.get(
								`${getAllGroupsOfUserByName}/${user.id}/${groupName}`
						  );
				setContacts(response.data.groups);
			} catch (error) {
				console.error(error);
			}
		},
		[user.id]
	);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await userApi.get(`${getAllGroupsOfUser}/${user.id}`);
				setContacts(response.data.groups);
				setIsLoaded(true);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [user.id]);

	useEffect(() => {
		if (currentChat) {
			socket.current.emit("add-user", currentChat.group_id);
		}
	}, [currentChat, socket]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<div className="h-full centered  bg-white">
			{isMobile ? (
				<MobileContacts
					handleSearch={handleSearch}
					contacts={contacts}
					socket={socket}
				/>
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
