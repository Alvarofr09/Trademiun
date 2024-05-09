import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

import axios from "axios";

import { jwtDecode } from "jwt-decode";

import {
	getAllGroupMessages,
	isAdmin,
	// getAllMessages,
	sendMessageRoute,
} from "../../api/APIRoutes";
import { useEffect, useRef, useState } from "react";

export default function ChatContainer({ currentChat, currentUser, socket }) {
	const [messages, setMessages] = useState([]);
	const [isAdministrador, setIsAdministrador] = useState(false);
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const scrollRef = useRef();

	useEffect(() => {
		async function fetchData() {
			const token = localStorage.getItem("token");
			// console.log(token);

			const user = jwtDecode(token);

			const { data } = await axios.post(`${isAdmin}/${user.id}`, {
				group_id: currentChat.id,
			});

			if (data.isAdmin) {
				setIsAdministrador(true);
			} else {
				setIsAdministrador(false);
			}
		}

		fetchData();
	}, [currentChat]);

	useEffect(() => {
		async function fetchData() {
			if (!currentChat) return;
			const response = await axios.post(getAllGroupMessages, {
				from: currentUser.id,
				to: currentChat.id,
			});

			setMessages(response.data);
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-recieve", (msg) => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, []);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMsg = async (msg) => {
		try {
			await axios.post(sendMessageRoute, {
				from: currentUser.id,
				to: currentChat.id,
				text: msg,
			});

			socket.current.emit("send-msg", {
				to: currentChat.id,
				from: currentUser.id,
				message: msg,
			});

			const msgs = [...messages];
			msgs.push({ fromSelf: true, message: msg });
			setMessages(msgs);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<>
			{currentChat && (
				<div
					className="container grid grid-rows-3 overflow-hidden"
					style={{ gridTemplateRows: "11% 75% auto" }}
				>
					<ChatHeader currentChat={currentChat} />
					<Messages messages={messages} scrollRef={scrollRef} />
					<ChatInput
						handleSendMsg={handleSendMsg}
						isAdmin={isAdministrador}
						currentUser={currentUser}
						currentChat={currentChat}
					/>
				</div>
			)}
		</>
	);
}
