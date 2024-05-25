import { useEffect, useState } from "react";
import InputSearch from "../components/ui/InputSearch";
// import WebNotificaciones from "../components/WebNotificaciones";
import {
	getAllGroups,
	getGroupsByName,
	getTopRentabilidad,
	getTopSeguidores,
	userApi,
} from "../api/APIRoutes";
import RestRankingTable from "../components/Ranking/RestRankingTable";
import Podium from "../components/Ranking/Podium";
import Img from "../components/ui/CloudinaryImg";
import { Link } from "react-router-dom";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";

export default function WebBuscador() {
	const [mostrarSeguidores, setMostrarSeguidores] = useState(true);
	const [usuarios, setUsuarios] = useState([]);
	const [topThree, setTopThree] = useState([]);
	const [restoRanking, setRestoRanking] = useState([]);
	const [grupos, setGrupos] = useState([]);
	const [visibleGroups, setVisibleGroups] = useState(3);

	const handleSearch = async (groupName) => {
		try {
			let data;

			if (groupName === "") {
				const response = await userApi.get(getAllGroups);
				data = response.data;
			} else {
				const response = await userApi.get(`${getGroupsByName}/${groupName}`);
				data = response.data;
			}

			setGrupos(data.groups);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowMore = () => {
		setVisibleGroups((prevVisibleGroups) => prevVisibleGroups + 5);
	};

	const handleShowLess = () => {
		setVisibleGroups((prevVisibleGroups) => prevVisibleGroups - 5);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				let response = "";
				if (mostrarSeguidores) {
					response = await userApi.get(getTopSeguidores);
				} else {
					response = await userApi.get(getTopRentabilidad);
				}
				setUsuarios(response.data);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, [mostrarSeguidores]);

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await userApi.get(getAllGroups);
				setGrupos(data.groups);
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	const dividirArray = (arr) => {
		const primeraParte = arr.slice(0, 3); // Array con los 3 primeros elementos
		const segundaParte = arr.slice(3); // Array con el resto de elementos
		return { primeraParte, segundaParte };
	};

	useEffect(() => {
		const { primeraParte, segundaParte } = dividirArray(usuarios);
		setTopThree(primeraParte);
		setRestoRanking(segundaParte);
	}, [usuarios]);

	const mostrarSeguidoresHandler = () => {
		setMostrarSeguidores(true);
	};

	const mostrarRentabilidadHandler = () => {
		setMostrarSeguidores(false);
	};

	return (
		<div className="flex h-full ">
			<div className="basis-8/12 mx-auto border-x-2 dark:bg-primario border-x-primario dark:border-x-white">
				<div className="flex justify-center dark:bg-primario  py-12 gap-36 2xl:gap-48">
					<button
						className={`text-primario dark:text-white text-3xl px-4 py-2 font-bold ${
							mostrarSeguidores
								? "bg-fondoWebApp rounded-2xl !text-primario"
								: ""
						}`}
						onClick={mostrarSeguidoresHandler}
					>
						Top Seguidores
					</button>
					<button
						className={`text-primario dark:text-white text-3xl px-4 py-2 font-bold ${
							mostrarSeguidores
								? ""
								: "bg-fondoWebApp rounded-2xl !text-primario"
						}`}
						onClick={mostrarRentabilidadHandler}
					>
						Top Rentabilidad
					</button>
				</div>

				<section className="podium dark:bg-primario max-w-[90%] mx-auto">
					<div className="flex justify-center">
						<Podium podium={topThree} seguidores={mostrarSeguidores} />
					</div>
				</section>

				<div className="rest-ranking mt-8 max-w-[90%] mx-auto">
					<RestRankingTable users={restoRanking} />
				</div>
			</div>

			<div className="basis-4/12 mx-auto dark:bg-primario bg-white relative">
				<InputSearch handleSearch={handleSearch} />
				<div className="contacts ">
					{grupos.slice(0, visibleGroups).map((grupo, index) => (
						<Link
							className={`contact mx-auto`}
							key={index}
							to={`/user/${grupo.admin_id}`}
						>
							{grupo.image && (
								<div className="avatar">
									<Img
										isContact={true}
										className="h-14 w-14 avatar-image"
										uploadedImg={grupo.image}
										alt="avatar"
									/>
								</div>
							)}
							<div className="username ">
								<h3 className="text-xl bold">{grupo.group_name}</h3>
								<h3 className=" bold">Participantes: {grupo.participantes}</h3>
							</div>
						</Link>
					))}
					<div className="centered">
						{visibleGroups < grupos.length && (
							<div className="flex justify-center my-4">
								<button
									className="text-secundario flex flex-row text-xl px-4 py-2 font-bold"
									onClick={handleShowMore}
								>
									Ver más <IconArrowDown color="#39BFF0" />
								</button>
							</div>
						)}
						{visibleGroups > 3 && (
							<div className="flex justify-center my-4">
								<button
									className="text-secundario flex flex-row text-xl px-4 py-2 font-bold"
									onClick={handleShowLess}
								>
									Ver menos <IconArrowUp color="#39BFF0" />
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
