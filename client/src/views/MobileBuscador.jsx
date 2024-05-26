import { useEffect, useState } from "react";

import InputSearch from "../components/ui/InputSearch";
import {
	getTopRentabilidad,
	getTopSeguidores,
	getUsersByNameRoute,
	userApi,
} from "../api/APIRoutes";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CardUser from "../components/CardUser";
import Img from "../components/ui/CloudinaryImg";

export default function MobileBuscador() {
	const [users, setUsers] = useState([]);
	const [usersBySeguidores, setUsersBySeguidores] = useState([]);
	const [usersByRentabilidad, setUsersByRentabilidad] = useState([]);
	const [visibleUsersBySeguidores, setVisibleUsersBySeguidores] = useState(2);
	const [visibleUsersByRentabilidad, setVisibleUsersByRentabilidad] =
		useState(2);

	const handleShowMoreSeguidores = () => {
		setVisibleUsersBySeguidores((prevVisibleGroups) => prevVisibleGroups + 3);
	};
	const handleShowLessSeguidores = () => {
		setVisibleUsersBySeguidores((prevVisibleGroups) => prevVisibleGroups - 3);
	};

	const handleShowMoreRentabilidad = () => {
		setVisibleUsersByRentabilidad((prevVisibleGroups) => prevVisibleGroups + 3);
	};

	const handleShowLessRentabilidad = () => {
		setVisibleUsersByRentabilidad((prevVisibleGroups) => prevVisibleGroups - 3);
	};

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

	useEffect(() => {
		async function fetchData() {
			try {
				const [responseSeguidores, responseRentabilidad] = await Promise.all([
					userApi.get(getTopSeguidores),
					userApi.get(getTopRentabilidad),
				]);
				setUsersBySeguidores(responseSeguidores.data);
				setUsersByRentabilidad(responseRentabilidad.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="mx-autow-full h-full dark:bg-primario pb-20">
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
				Top Seguidores
			</h2>
			{usersBySeguidores
				.slice(0, visibleUsersBySeguidores)
				.map((usuario, index) => (
					<Link className={`mx-auto`} key={index} to={`/user/${usuario.id}`}>
						<CardUser usuario={usuario} seguidores={true} />
					</Link>
				))}

			<div className="centered">
				{visibleUsersBySeguidores < usersBySeguidores.length && (
					<div className="flex justify-center my-4">
						<button
							className="text-secundario flex flex-row text-xl px-4 py-2 font-bold "
							onClick={handleShowMoreSeguidores}
						>
							Ver más <IconArrowDown color="#39BFF0" />
						</button>
					</div>
				)}

				{visibleUsersBySeguidores > 2 && (
					<div className="flex justify-center my-4">
						<button
							className="text-secundario flex flex-row text-xl px-4 py-2 font-bold "
							onClick={handleShowLessSeguidores}
						>
							Ver menos <IconArrowUp color="#39BFF0" />
						</button>
					</div>
				)}
			</div>

			<h2 className="text-center text-2xl font-bold text-primario dark:text-white p-4">
				Más Rentables
			</h2>
			{usersByRentabilidad
				.slice(0, visibleUsersByRentabilidad)
				.map((usuario, index) => (
					<Link className={`mx-auto`} key={index} to={`/user/${usuario.id}`}>
						<CardUser usuario={usuario} seguidores={false} />
					</Link>
				))}

			<div className="centered">
				{visibleUsersByRentabilidad < usersByRentabilidad.length && (
					<div className="flex justify-center my-4">
						<button
							className="text-secundario flex flex-row text-xl px-4 py-2 font-bold "
							onClick={handleShowMoreRentabilidad}
						>
							Ver más <IconArrowDown color="#39BFF0" />
						</button>
					</div>
				)}

				{visibleUsersByRentabilidad > 2 && (
					<div className="flex justify-center my-4">
						<button
							className="text-secundario flex flex-row text-xl px-4 py-2 font-bold "
							onClick={handleShowLessRentabilidad}
						>
							Ver menos <IconArrowUp color="#39BFF0" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
