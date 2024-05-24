import { useEffect, useState } from "react";

import InputSearch from "../components/ui/InputSearch";
import {
	getTopRentabilidad,
	getTopSeguidores,
	userApi,
} from "../api/APIRoutes";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import CardUser from "../components/CardUser";

export default function MobileBuscador() {
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
		<div className="mx-autow-full h-full bg-primario pb-20">
			<InputSearch />
			<h2 className="text-center text-2xl font-bold text-white p-4">
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

			<h2 className="text-center text-2xl font-bold text-white p-4">
				Más Rentables
			</h2>
			{usersByRentabilidad
				.slice(0, visibleUsersByRentabilidad)
				.map((usuario, index) => (
					<Link className={`mx-auto`} key={index} to={`/user/${usuario.id}`}>
						<CardUser usuario={usuario} seguidores={false} />
					</Link>
				))}
			{visibleUsersByRentabilidad < usersByRentabilidad.length && (
				<div className="flex justify-center my-4">
					<button
						className="text-secundario flex flex-row text-xl px-4 py-2 font-bold "
						onClick={handleShowMoreSeguidores}
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
	);
}
