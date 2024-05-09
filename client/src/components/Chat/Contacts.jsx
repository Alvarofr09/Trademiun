import { useState, useEffect } from "react";

import Logout from "../Logout";
import { Link } from "react-router-dom";

export default function Contacts({ contacts, currentUser, changeChat }) {
	const [currentUserName, setCurrentUserName] = useState(undefined);
	const [currentUserImage, setCurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);
	useEffect(() => {
		if (currentUser) {
			setCurrentUserName(currentUser.username);
			setCurrentUserImage(currentUser.image);
		}
	}, [currentUser]);

	// useEffect(() => {
	// 	console.log("currentSelected en el useEffect:", currentSelected);
	// }, [currentSelected]);

	const changeCurrentChat = (index, contact) => {
		setCurrentSelected(index);
		changeChat(contact);
	};

	return (
		<>
			{currentUserImage && currentUserName && (
				<div
					className="container grid grid-rows-3 overflow-hidden bg-[#080420]"
					style={{ gridTemplateRows: "10% 65% auto" }}
				>
					<div className="brand ">
						<h1 className="titulo  uppercase">Trademiun</h1>
					</div>
					<div className="contacts ">
						{contacts.map((contact, index) => {
							console.log(contact);
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
											<img
												className="h-12 avatar-image"
												src={contact.image}
												alt="avatar"
											/>
										</div>
									)}
									<div className="  username">
										<h3 className=" text-xl text-white bold">
											{contact.username ? contact.username : contact.group_name}
										</h3>
									</div>
								</div>
							);
						})}

						<p className=" mt-8 text-center text-xs text-[#9C9999]">
							¿No tienes más chats? Buscalos{" "}
							<Link to="/" className="text-blue-500 underline">
								AQUI
							</Link>
						</p>
					</div>
					<Link
						to={`/user/${currentUser.id}`}
						className="current-user bg-[#0d0d30] centered"
					>
						<div className="avatar h-16">
							<img
								className="h-full avatar-image"
								src={currentUserImage}
								alt="avatar"
							/>
						</div>
						<div className="username">
							<h3 className=" sm:hidden md:flex text-xl text-white uppercase">
								{currentUserName}
							</h3>
						</div>
					</Link>
					<Logout />
				</div>
			)}
		</>
	);
}
