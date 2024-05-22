import { useEffect, useState } from "react";
import InputSearch from "../components/InputSearch";
// import WebNotificaciones from "../components/WebNotificaciones";
import {
	getAllGroups,
	getTopRentabilidad,
	getTopSeguidores,
	userApi,
} from "../api/APIRoutes";
import RestRankingTable from "../components/Ranking/RestRankingTable";
import Podium from "../components/Ranking/Podium";
import Img from "../components/ui/CloudinaryImg";

const WebBuscador = () => {
	const [mostrarSeguidores, setMostrarSeguidores] = useState(true);
	const [usuarios, setUsuarios] = useState([]);
	const [topThree, setTopThree] = useState([]);
	const [restoRanking, setRestoRanking] = useState([]);
	const [grupos, setGrupos] = useState([]);

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
		<div className="flex h-full">
			<div className="basis-8/12 mx-auto border-x-2 border-x-primario overflow-y-scroll custom-scrollbar">
				<div className="flex justify-center  py-12 gap-36 2xl:gap-48">
					<button
						className={`text-primario text-3xl px-4 py-2 font-bold ${
							mostrarSeguidores ? "bg-fondoWebApp rounded-2xl" : ""
						}`}
						onClick={mostrarSeguidoresHandler}
					>
						Top Seguidores
					</button>
					<button
						className={`text-primario text-3xl px-4 py-2 font-bold ${
							mostrarSeguidores ? "" : "bg-fondoWebApp rounded-2xl"
						}`}
						onClick={mostrarRentabilidadHandler}
					>
						Top Rentabilidad
					</button>
				</div>

				<section className="podium max-w-[90%] mx-auto">
					<div className="flex justify-center">
						<Podium podium={topThree} seguidores={mostrarSeguidores} />
					</div>
				</section>

				<div className="rest-ranking mt-8 max-w-[90%] mx-auto">
					<RestRankingTable users={restoRanking} />
				</div>
			</div>

			<div className="basis-4/12 mx-auto bg-white overflow-y-scroll custom-scrollbar">
				<InputSearch />
				{/* <InputSearch />
				<WebNotificaciones
					nombre="JuanJo Trader"
					notificacion="LLEVA UNA RACHA DE 5 TAKE PROFITS SEGUIDOS"
					foto="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				/>
				<WebNotificaciones
					nombre="JuanJo Trader"
					notificacion="HA GANADO HOY 3 TRADES"
					foto="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				/> */}
				{grupos.map((grupo, index) => (
					<div
						className={`contact mx-auto`}
						key={index}
						onClick={() => alert("hola")}
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
						<div className="  username">
							<h3 className=" text-xl  bold">{grupo.group_name}</h3>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default WebBuscador;
