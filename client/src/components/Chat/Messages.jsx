import { v4 as uuidv4 } from "uuid";
import Signal from "../ui/Signal";

export default function Messages({ messages, scrollRef }) {
	return (
		<div className="chat-messages bg-white scrollbar-custom py-4 px-8 flex flex-col gap-4 overflow-auto">
			{messages.map((message) => {
				console.log(message);
				return (
					<div
						ref={scrollRef}
						key={uuidv4()}
						className={`${message.type === "signal" && "flex"} ${
							message.fromSelf ? "sended" : "recieved"
						}`}
					>
						{message.type === "message" ? (
							<div
								className={`flex items-center mensaje ${
									message.fromSelf ? "sended" : "recieved"
								}`}
							>
								<div className="content max-w-[60%] break-normal text-lg rounded-2xl text-[#000000] p-4">
									{message.message}
								</div>
							</div>
						) : (
							<Signal signal={message} isMessage={true} />
						)}
					</div>
				);
			})}
		</div>
	);
}
