import { IconChevronLeft, IconDotsVertical } from "@tabler/icons-react";
import Img from "../ui/CloudinaryImg";
import useDeviceType from "../../hooks/useDeviceType";

export default function ChatHeader({ onBack, currentChat }) {
	const isMobile = useDeviceType();
	return (
		<div className="chat-header bg-tipografia flex justify-between items-center px-8 py-0">
			{/* {console.log(currentChat)} */}
			<div className="user-details flex items-center gap-4">
				<div className="user-image avatar-image">
					<Img
						isContact={false}
						className="h-14 w-14 avatar-image"
						uploadedImg={currentChat.image}
						alt="avatar"
					/>
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
			<div className="options centered flex-row gap-8 cursor-pointer">
				{isMobile && (
					<div className="back">
						<IconChevronLeft color="#1A1A1A" onClick={onBack} />
					</div>
				)}

				<div className="info">
					<IconDotsVertical color="#1A1A1A" onClick={() => alert("info")} />
				</div>
				{/* <div className="subChat">
					<IconMessage color="#1A1A1A" />
				</div> */}
			</div>
		</div>
	);
}
