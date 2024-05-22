import foto_perfil from "../assets/img/foto_perfil.png";
import ProgressBar from "../components/ProgressBar";

export default function MobilePerfil() {
	return (
		<div className="mx-auto w-full h-full bg-primario py-20">
			<div className="flex justify-center">
				<img src={foto_perfil} alt="foto perfil" />
			</div>

			<div className="flex justify-center py-4 gap-3 items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none" />
					<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
					<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
					<path d="M16 5l3 3" />
				</svg>
				<h2 className="text-white text-3xl font-bold">Usuario</h2>
			</div>
			<div className="">
				<h4 className="text-center text-tipografia text-sm mb-4">
					31.000 seguidores
				</h4>
			</div>

			<ProgressBar titulo="Máximo Drawdown" porcentaje="66.6%" />
			<ProgressBar titulo="Riesgo/Beneficio medio" porcentaje="90.7%" />
			<ProgressBar titulo="% Mensual medio" porcentaje="77%" />
			<ProgressBar titulo="% Riesgo medio/trade" porcentaje="83.3%" />

			<div className="flex p-4">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
						<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
						<path d="M16 5l3 3" />
					</svg>
				</div>

				<div className="mb-4">
					<p className="text-white">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis saepe
						unde, quos error ea consequatur sed repudiandae veritatis. Sed
						deserunt officiis neque minus adipisci fugit quasi, blanditiis quod
						debitis iusto, laborum fugiat dolorem commodi excepturi facere
						soluta quibusdam tempore obcaecati.
					</p>
				</div>
			</div>
			<div>
				<button className="text-white bg-secundario px-4 py-2 rounded-xl ml-2">
					Añadir trade
				</button>
			</div>
		</div>
	);
}
