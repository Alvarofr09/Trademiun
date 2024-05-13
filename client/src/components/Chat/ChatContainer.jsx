import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

import axios from "axios";

import { jwtDecode } from "jwt-decode";

import {
	getAllGroupMessages,
	getSignalsGroup,
	isAdmin,
	// getAllMessages,
	sendMessageRoute,
	sendSignalRoute,
	userApi,
} from "../../api/APIRoutes";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../context/UserContext";

export default function ChatContainer({ currentChat, socket }) {
	const { user } = useUserContext();
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
			const mensajes = await userApi.post(getAllGroupMessages, {
				from: user.id,
				to: currentChat.id,
			});

			const signals = await userApi.post(getSignalsGroup, {
				from: user.id,
				to: currentChat.id,
			});

			const allMessages = mensajes.data.concat(signals.data);

			const datos = allMessages.sort(
				(a, b) => new Date(a.date) - new Date(b.date)
			);
			setMessages(datos);
		}

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentChat]);

	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-recieve", (msg) => {
				if (msg.type === "message") {
					setArrivalMessage({
						fromSelf: false,
						message: msg.message,
						type: msg.type,
					});
				} else {
					setArrivalMessage({
						fromSelf: false,
						description: msg.description,
						moneda: msg.moneda,
						entrada: msg.entrada,
						stopLoss: msg.stopLoss,
						takeProfit: msg.takeProfit,
						riesgo: msg.riesgo,
						isCompra: msg.isCompra,
						type: msg.type,
					});
				}
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
				from: user.id,
				to: currentChat.id,
				text: msg,
			});

			socket.current.emit("send-msg", {
				to: currentChat.id,
				from: user.id,
				message: msg,
				type: "message",
			});

			const msgs = [...messages];
			msgs.push({ fromSelf: true, message: msg, type: "message" });
			setMessages(msgs);
		} catch (error) {
			alert(error);
		}
	};

	const handleSendSignal = async (signal) => {
		const {
			from,
			to,
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		} = signal;

		const { data } = await userApi.post(sendSignalRoute, {
			from,
			to,
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
		});

		if (data.status === false) {
			alert(data.message);
		}

		socket.current.emit("send-msg", {
			to: currentChat.id,
			from,
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
			type: "signal",
		});
		const msgs = [...messages];
		msgs.push({
			fromSelf: true,
			description,
			moneda,
			entrada,
			stopLoss,
			takeProfit,
			riesgo,
			isCompra,
			type: "signal",
		});
		setMessages(msgs);
	};
	return (
		<>
			{currentChat && (
				<div
					className="container h-full grid grid-rows-3 overflow-hidden"
					style={{ gridTemplateRows: "11% 75% auto" }}
				>
					<ChatHeader currentChat={currentChat} />
					<Messages messages={messages} scrollRef={scrollRef} />
					<ChatInput
						handleSendMsg={handleSendMsg}
						isAdmin={isAdministrador}
						currentChat={currentChat}
						handleSendSignal={handleSendSignal}
					/>
				</div>
			)}
		</>
	);
}
