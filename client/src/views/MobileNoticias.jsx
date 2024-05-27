import { useState } from "react";
import { getUsersByNameRoute, userApi } from "../api/APIRoutes";
import CardUltimosTrades from "../components/CardUltimosTrades";
import InputSearch from "../components/ui/InputSearch";
import { Link } from "react-router-dom";
import Img from "../components/ui/CloudinaryImg";

export default function MobileNoticias() {
	const [users, setUsers] = useState([]);

	const handleSearch = async (userName) => {
		try {
			let data;

			if (userName === "") {
				data = { users: [] };
			} else {
				const response = await userApi.get(
					`${getUsersByNameRoute}/${userName}`
				);
				data = response.data;
			}

			setUsers(data.users);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mx-auto max-w-full h-full bg-white dark:bg-primario pb-20">
			<InputSearch handleSearch={handleSearch} />
			{users.length > 0 && (
				<div className="centered flex-col">
					{users.slice(0, 3).map((user, index) => {
						return (
							<Link
								className={`contact !flex-row centered !border-white`}
								key={index}
								to={`/user/${user.id}`}
							>
								{user.image && (
									<div className="avatar">
										<Img
											isContact={true}
											className="h-14 w-14 avatar-image"
											uploadedImg={user.image}
											alt="avatar"
										/>
									</div>
								)}
								<div className="  username">
									<h3 className=" text-xl text-white bold">{user.username}</h3>
								</div>
							</Link>
						);
					})}
				</div>
			)}
			<h2 className="text-center text-2xl font-bold text-primario dark:text-white p-4">
				Últimos trades
			</h2>
			<div className="flex flex-col justify-center items-center">
				<CardUltimosTrades />
				<CardUltimosTrades />
				<CardUltimosTrades />
			</div>
		</div>
	);
}
