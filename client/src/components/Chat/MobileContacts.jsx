// MobileContacts.jsx
import { useState } from "react";
import InputSearch from "../ui/InputSearch";
import Img from "../ui/CloudinaryImg";
import MobileChatContainer from "./MobileChatContainer";
import { Link } from "react-router-dom";

export default function MobileContacts({ contacts, socket }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(contact);
	};

	const handleBack = () => {
		setCurrentSelected(undefined);
	};

	return (
		<div className="container h-full flex flex-col overflow-hidden dark:bg-primario bg-white">
			{currentSelected ? (
				<MobileChatContainer
					currentChat={currentSelected}
					onBack={handleBack}
					socket={socket}
				/>
			) : (
				<>
					<div className="basis-1/12 w-full">
						<InputSearch />
					</div>
					<div className="contacts basis-11/12">
						{contacts.map((contact, index) => (
							<div
								className={`contact ${
									index === currentSelected ? "selected-contact" : ""
								}`}
								key={index}
								onClick={() => changeCurrentChat(index, contact)}
							>
								{contact.image && (
									<div className="avatar">
										<Img
											isContact={true}
											className="h-14 w-14 avatar-image"
											uploadedImg={contact.image}
											alt="avatar"
										/>
									</div>
								)}
								<div className="username">
									<h3 className="text-xl bold">
										{contact.username || contact.group_name}
									</h3>
								</div>
							</div>
						))}
						<p className="mt-8 text-center text-xs text-primario">
							¿No tienes más chats? Búscalos{" "}
							<Link to="/busqueda" className="text-secundario underline">
								AQUÍ
							</Link>
						</p>
					</div>
				</>
			)}
		</div>
	);
}
