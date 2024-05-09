import InputSearch from "../components/InputSearch";
// import SideBar from "../components/SideBar";
import WebNotificaciones from "../components/WebNotificaciones";
import WebPodium from "../components/WebPodium";
import WebTablaRentabilidad from "../components/WebTablaRentabilidad";

const WebBuscador = () => {
	return (
		<div className="flex ">
			<div className="basis-8/12 mx-auto ">
				<div className="flex justify-center py-12 gap-36 2xl:gap-48">
					<button className="text-primario text-xl font-bold">
						Top Seguidores
					</button>
					<button className="text-primario text-xl font-bold">
						Top Rentabilidad
					</button>
				</div>

				<WebPodium />
				<WebTablaRentabilidad className="mx-auto" />
			</div>

			<div className="basis-4/12 my-8 mx-auto mr-8 ">
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
