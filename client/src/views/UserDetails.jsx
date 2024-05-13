// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { getUserSignals, userApi } from "../api/APIRoutes";

export default function UserDetails() {
	const { user } = useUserContext();
	const [signals, setSignals] = useState([]);
	console.log(user);

	useEffect(() => {
		async function fetchData() {
			const datos = await userApi.get(`${getUserSignals}/${user.id}`);
			console.log(datos);
			setSignals(await datos.data);
		}

		fetchData();
	}, [user]);

	return (
		<main className="h-screen centered bg-white">
			<section className="basis-8/12 border-x-2 gap-11 border-black h-screen user-info centered flex-col">
				<div className="bordered centered gap-16 w-full py-5 px-12">
					<div className="user-image basis-1/4">
						<img
							className="avatar-image"
							src={user.image}
							alt={`Avatar de ${user.username}`}
						/>
					</div>
					<div className="user-details basis-3/4 text-3xl">
						<p>
							<strong>Usuario: </strong>
							{user.username}
						</p>
						<p>
							<strong>Email: </strong>
							{user.email}
						</p>
						<p>
							<strong>Seguidores: </strong>
							{user.seguidores}
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
							{user.rentabilidad} %
						</li>
					</ul>
				</div>
			</section>

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
							return (
								<div
									key={signal.id}
									className="signal max-w-[80%] mx-auto my-8"
								>
									<div className="content break-normal text-white py-5 px-10 text-lg rounded-2xl">
										{signal.image && <img src={signal.image} alt="" />}
										{signal.description && <p>{signal.description}</p>}

										<p>
											<strong>Moneda: </strong> {signal.moneda}
										</p>
										<p>
											<strong>Riesgo: </strong> {signal.riesgo}%
										</p>
										<p>
											<strong>Entrada: </strong> {signal.entrada}
										</p>
										<p>
											<strong>SL: </strong> {signal.stopLoss}
										</p>
										<p>
											<strong>TP: </strong> {signal.takeProfit}
										</p>
										<p
											className={`titulo ${
												signal.isCompra ? "text-emerald-600" : "text-red-600"
											} `}
										>
											{signal.isCompra ? "COMPRA" : "VENTA"}
										</p>
									</div>
								</div>
							);
						})
					)}
				</div>
			</article>
		</main>
	);
}
