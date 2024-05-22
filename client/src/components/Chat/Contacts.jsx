import { useState } from "react";
import { Link } from "react-router-dom";
import InputSearch from "../ui/InputSearch";
import Img from "../ui/CloudinaryImg";

export default function Contacts({ handleSearch, contacts, changeChat }) {
	const [currentSelected, setCurrentSelected] = useState(undefined);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			<div
				className="container h-full flex flex-col overflow-hidden bg-white"
				// style={{ gridTemplateRows: "10% 65% auto" }}
			>
				<div className="basis-1/12 w-full">
					<InputSearch handleSearch={handleSearch} />
				</div>
				<div className="contacts basis-11/12">
					{contacts.map((contact, index) => {
						return (
							<div
								className={`contact  ${
									index === currentSelected && "selected-contact"
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
								<div className="  username">
									<h3 className=" text-xl  bold">{contact.group_name}</h3>
								</div>
							</div>
						);
					})}

					<p className=" mt-8 text-center text-xs text-primario">
						¿No tienes más chats? Buscalos{" "}
						<Link to="/busqueda" className="text-secundario underline">
							AQUI
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
