import Picker from "emoji-picker-react";
import { IconSend2 } from "@tabler/icons-react";
import { IconMoodHappy } from "@tabler/icons-react";
import { IconClipboardData } from "@tabler/icons-react";
import { useState } from "react";
import Modal from "../Modal";
import SignalForm from "../SignalForm/SignalForm";
import useThemeToggle from "../../hooks/useThemeToggle";

export default function ChatInput({
	handleSendMsg,
	isAdmin,
	currentChat,
	handleSendSignal,
}) {
	const [theme] = useThemeToggle();
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
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div
			className={`container gap-6 centered bg-white dark:bg-primario px-8 py-0 pb-[0.3rem]`}
		>
			{isAdmin ? (
				<>
					<div className="button-container flex items-center text-white dark:text-primario gap-4">
						<div className="emoji relative">
							{showEmojiPicker && (
								<Picker className="" onEmojiClick={handleEmojiClick} />
							)}
							<div className=" text-primario dark:text-white">
								<IconMoodHappy
									onClick={handleEmojiPickerHideShow}
									className="cursor-pointer "
									size={30}
								/>
							</div>
						</div>
					</div>

					<form
						onSubmit={(e) => sendChat(e)}
						className="input-container w-[100%] rounded-[2rem] flex content-center gap-8 bg-fondoWebApp"
					>
						<>
							<input
								type="text"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Type your message here"
								className="w-[90%] bg-transparent border-none pl-4 text-xl text-terciario focus:outline-none"
							/>
							<button
								type="submit"
								className={`submit-btn md:py-0 pr-8 lg:py-1 rounded-[2rem] centered ${
									theme === "dark" ? "dark:text-white" : ""
								} border-none`}
							>
								<IconSend2 color={"#1A1A1A"} size={32} />
							</button>
						</>
					</form>

					<div
						className="signal text-primario dark:text-white"
						onClick={showSignalForm}
					>
						<IconClipboardData />
					</div>

					{showModal && (
						<Modal
							closeModal={closeModal}
							isImg={false}
							title="Formulario de Señal"
						>
							<SignalForm
								currentChat={currentChat}
								handleSendSignal={handleSendSignal}
								closeModal={closeModal}
							/>
						</Modal>
					)}
				</>
			) : (
				<div className="dark:bg-primario centered gap-4">
					<button className="btn-dark">Silenciar</button>
				</div>
			)}
		</div>
	);
}
