import { useEffect, useState } from "react";
import InputSearch from "../components/InputSearch";
import WebNotificaciones from "../components/WebNotificaciones";
import {
	getTopRentabilidad,
	getTopSeguidores,
	userApi,
} from "../api/APIRoutes";
import RestRankingTable from "../components/Ranking/RestRankingTable";
import Podium from "../components/Ranking/Podium";

const WebBuscador = () => {
	const [mostrarSeguidores, setMostrarSeguidores] = useState(true);
	const [usuarios, setUsuarios] = useState([]);
	const [topThree, setTopThree] = useState([]);
	const [restoRanking, setRestoRanking] = useState([]);

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
			<div className="basis-8/12 mx-auto border-y-2 border-primario">
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

			<div className="basis-4/12 py-8 mx-auto pr-8 bg-fondoWebApp">
				<InputSearch />
				<WebNotificaciones
					nombre="JuanJo Trader"
					notificacion="LLEVA UNA RACHA DE 5 TAKE PROFITS SEGUIDOS"
					foto="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				/>
				<WebNotificaciones
					nombre="JuanJo Trader"
					notificacion="HA GANADO HOY 3 TRADES"
					foto="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				/>
			</div>
		</div>
	);
};

export default WebBuscador;
