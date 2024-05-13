// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { getUserInfo, getUserSignals, userApi } from "../api/APIRoutes";
import { useParams } from "react-router-dom";
import Signal from "../components/ui/Signal";

export default function UserDetails() {
	const { id } = useParams();
	const { user } = useUserContext();
	const [userData, setUserData] = useState(null);
	const [signals, setSignals] = useState([]);

	useEffect(() => {
		async function fetchData() {
			let userDataResponse;
			if (id != user.id) {
				// Si el ID de los parámetros es diferente al ID del usuario logueado, realiza una petición para obtener los datos del usuario correspondiente al ID de los parámetros
				userDataResponse = await userApi.get(`${getUserInfo}/${id}`);
			} else {
				userDataResponse = { data: user }; // Usa los datos del usuario logueado
			}
			setUserData(userDataResponse.data);

			// Obtiene las señales del usuario (ya sea el logueado o el usuario obtenido por ID)
			const signalsResponse = await userApi.get(
				`${getUserSignals}/${userDataResponse.data.id}`
			);
			setSignals(signalsResponse.data);
		}

		fetchData();
	}, [id, user]);

	return (
		<main className="h-screen centered bg-white">
			{userData && (
				<section className="basis-8/12 border-x-2 gap-11 border-black h-screen user-info centered flex-col">
					<div className="bordered centered gap-16 w-full py-5 px-12">
						<div className="user-image basis-1/4">
							<img
								className="avatar-image"
								src={userData.image}
								alt={`Avatar de ${userData.username}`}
							/>
						</div>
						<div className="user-details basis-3/4 text-3xl">
							<p>
								<strong>Usuario: </strong>
								{userData.username}
							</p>
							<p>
								<strong>Email: </strong>
								{userData.email}
							</p>
							<p>
								<strong>Seguidores: </strong>
								{userData.seguidores}
							</p>
						</div>
					</div>
					<div className="bordered centered w-full"></div>
					<div className="bordered centered w-full gap-6 text-2xl py-16 px-20">
						<ul className="w-1/2">
							<li>
								<strong>Señales: </strong>
								120
							</li>
							<li>
								<strong>Aciertos: </strong>
								80/120
							</li>
							<li>
								<strong>Ganancia promedio: </strong>
								45 pips
							</li>
							<li>
								<strong>Perdida promedio: </strong>6 pips
							</li>
						</ul>
						<ul className="w-1/2">
							<li>
								<strong>Duración promedio: </strong>4 horas
							</li>
							<li>
								<strong>Riesgo promedio: </strong>
								1.6 %
							</li>
							<li>
								<strong>Sesión promedio: </strong>
								Asia
							</li>
							<li>
								<strong>Total rentabilidad: </strong>
								{/* {user.rentabilidad} % */}
								54%
							</li>
						</ul>
					</div>
				</section>
			)}

			<article className="trades centered flex-col basis-4/12 h-full ">
				<div className="basis-1/12 centered">
					<h2 className="titulo">Ultimos Trades</h2>
				</div>
				<div className="basis-11/12 ">
					{signals.length === 0 ? (
						<h3 className="mt-10 text-xl centered">No hay trades</h3>
					) : (
						//TODO: hacer componente de señal, para usarlo en mas sitios
						signals.map((signal) => {
							return <Signal key={signal.id} signal={signal} />;
						})
					)}
				</div>
			</article>
		</main>
	);
}
