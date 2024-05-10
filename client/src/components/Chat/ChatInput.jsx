import Picker from "emoji-picker-react";
import { IconSend2 } from "@tabler/icons-react";
import { IconMoodSmileFilled } from "@tabler/icons-react";
import { IconClipboardData } from "@tabler/icons-react";
import { useState } from "react";
import Modal from "../Modal";
import SignalForm from "../SignalForm/SignalForm";

export default function ChatInput({
	handleSendMsg,
	isAdmin,
	currentUser,
	currentChat,
	handleSendSignal,
}) {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [message, setMessage] = useState("");

	const handleEmojiPickerHideShow = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	const handleEmojiClick = (emoji) => {
		let msg = message;
		msg += emoji.emoji;
		setMessage(msg);
	};

	const sendChat = async (event) => {
		event.preventDefault();
		if (message.length > 0) {
			handleSendMsg(message);
			setMessage("");
		}
	};

	const showSignalForm = () => {
		setShowModal(true); // Mostrar el modal al activar la función
	};

	const closeModal = () => {
		setShowModal(false); // Cerrar el modal
	};

	return (
		<div className="container gap-6  centered bg-white px-8 py-0 pb-[0.3rem]">
			{isAdmin ? (
				<>
					<div className="button-container flex items-center text-white gap-4">
						<div className="emoji relative">
							{showEmojiPicker && (
								<Picker className="" onEmojiClick={handleEmojiClick} />
							)}
							<IconMoodSmileFilled
								onClick={handleEmojiPickerHideShow}
								color="#ffff00c8"
								className="cursor-pointer"
								size={30}
							/>
						</div>
					</div>

					<form
						onSubmit={(e) => sendChat(e)}
						className="input-container  w-[100%] rounded-[2rem] flex content-center gap-8 bg-fondoWebApp"
					>
						<>
							<input
								type="text"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message here"
								className="w-[90%]  bg-transparent border-none pl-4 text-xl text-terciario focus:outline-none"
							/>
							<button
								type="submit"
								className="submit-btn md:py-0 px-8 lg:py-1 rounded-[2rem] centered  border-none"
							>
								<IconSend2 color="#1A1A1A" size={32} />
							</button>
						</>
					</form>

					<div className="signal" onClick={showSignalForm}>
						<IconClipboardData color="#1A1A1A" />
					</div>

					{showModal && (
						<Modal closeModal={closeModal}>
							<SignalForm
								currentUser={currentUser}
								currentChat={currentChat}
								handleSendSignal={handleSendSignal}
								closeModal={closeModal}
							/>
						</Modal>
					)}
				</>
			) : (
				<div className="centered gap-4">
					<button className="btn-dark">Silenciar</button>
				</div>
			)}
		</div>
	);
}
