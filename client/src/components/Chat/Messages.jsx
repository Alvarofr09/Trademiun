import { v4 as uuidv4 } from "uuid";

export default function Messages({ messages, scrollRef }) {
	return (
		<div className="chat-messages bg-[#000000] scrollbar-custom py-4 px-8 flex flex-col gap-4 overflow-auto">
			{messages.map((message) => {
				return (
					<div ref={scrollRef} key={uuidv4()}>
						<div
							className={`message  flex items-center ${
								message.fromSelf ? "sended" : "recieved"
							}`}
						>
							<div className="content max-w-[60%] break-all p-4 text-lg rounded-2xl text-[#000000]">
								{message.message}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
