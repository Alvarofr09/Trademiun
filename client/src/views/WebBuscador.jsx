import { useState } from "react";
import InputSearch from "../components/InputSearch";
// import SideBar from "../components/SideBar";
import WebNotificaciones from "../components/WebNotificaciones";
import WebPodium from "../components/WebPodium";
import WebTablaRentabilidad from "../components/WebTablaRentabilidad";

const WebBuscador = () => {
	const [mostrarSeguidores, setMostrarSeguidores] = useState(true);

	const mostrarSeguidoresHandler = () => {
		setMostrarSeguidores(true);
	};

	const mostrarRentabilidadHandler = () => {
		setMostrarSeguidores(false);
	};

	return (
		<div className="flex">
			<div className="basis-7/12 mx-auto">
				<div className="flex justify-center py-12 gap-36 2xl:gap-48">
					<button
						className="text-primario text-xl font-bold"
						onClick={mostrarSeguidoresHandler}
					>
						Top Seguidores
					</button>
					<button
						className="text-primario text-xl font-bold"
						onClick={mostrarRentabilidadHandler}
					>
						Top Rentabilidad
					</button>
				</div>

				{mostrarSeguidores ? (
					<WebPodium
						nombre="PabloFC"
						avatar="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
						seguidores="100K"
					/>
				) : (
					<WebPodium
						nombre="Izabel"
						avatar="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						rentabilidad="150%"
					/>
				)}
				<WebTablaRentabilidad className="mx-auto" />
			</div>

			<div className="basis-5/12 py-8 mx-auto pr-8 bg-blue-300">
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
