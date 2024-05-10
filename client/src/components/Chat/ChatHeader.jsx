import { IconMessage } from "@tabler/icons-react";
import { IconDotsVertical } from "@tabler/icons-react";

export default function ChatHeader({ currentChat }) {
	return (
		<div className="chat-header bg-tipografia flex justify-between items-center px-8 py-0">
			{/* {console.log(currentChat)} */}
			<div className="user-details flex items-center gap-4">
				<div className="user-image avatar-image">
					<img className="h-12" src={currentChat.image} alt="avatar" />
				</div>
				<div className="username">
					<h3 className="text-primario text-xl font-bold">
						{currentChat.group_name}
					</h3>
					<span className="text-primario">
						{currentChat.participantes} Participantes
					</span>
				</div>
			</div>
			<div className="options centered flex-row gap-8">
				<div className="info">
					<IconDotsVertical color="#1A1A1A" />
				</div>
				<div className="subChat">
					<IconMessage color="#1A1A1A" />
				</div>
			</div>
		</div>
	);
}
