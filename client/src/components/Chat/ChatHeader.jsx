import { IconMessage } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";

export default function ChatHeader({ currentChat }) {
	return (
		<div className="chat-header bg-[#2B2A29] flex justify-between items-center px-8 py-0">
			{console.log(currentChat)}
			<div className="user-details flex items-center gap-4">
				<div className="user-image avatar-image">
					<img className="h-12" src={currentChat.image} alt="avatar" />
				</div>
				<div className="username">
					<h3 className="text-white text-xl font-bold">
						{currentChat.group_name}
					</h3>
					<span className="text-[#9C9999]">
						{currentChat.participantes} Participantes
					</span>
				</div>
			</div>
			<div className="options centered flex-row gap-8">
				<div className="info">
					<IconDotsVertical color="#ffffff" />
				</div>
				<div className="subChat">
					<IconMessage color="#ffffff" />
				</div>
			</div>
		</div>
	);
}
