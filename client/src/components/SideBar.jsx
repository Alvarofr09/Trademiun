import { Link } from "react-router-dom";
import logo_negro from "../assets/img/logo_negro.png";
import { useUserContext } from "../context/UserContext";

const SideBar = () => {
	const { user } = useUserContext();
	return (
		<>
			<div className="max-w-68 h-lvh sticky top-0 bg-slate-600">
				{/* Sidebar */}
				<div className="py-8 w-36 ml-12 ">
					<img src={logo_negro} alt="logo" />
				</div>

				<Link to={"/"} className="flex hover:cursor-pointer mb-8">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-message ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M8 9h8" />
							<path d="M8 13h6" />
							<path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Chats</p>
					</div>
				</Link>

				<Link to={"/busqueda"} className="flex hover:cursor-pointer mb-8">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-search ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
							<path d="M21 21l-6 -6" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Búsqueda</p>
					</div>
				</Link>

				<div className="flex hover:cursor-pointer mb-8">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-news ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
							<path d="M8 8l4 0" />
							<path d="M8 12l4 0" />
							<path d="M8 16l4 0" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Noticias</p>
					</div>
				</div>

				<div className="flex hover:cursor-pointer mb-8">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-video ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
							<path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Cursos</p>
					</div>
				</div>

				<Link
					to={`/user/${user.id}`}
					className="flex hover:cursor-pointer mb-8"
				>
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							<path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Perfil</p>
					</div>
				</Link>

				<div className="flex hover:cursor-pointer mb-8">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							className="icon icon-tabler icons-tabler-outline icon-tabler-credit-card ml-12"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 5m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
							<path d="M3 10l18 0" />
							<path d="M7 15l.01 0" />
							<path d="M11 15l2 0" />
						</svg>
					</div>
					<div>
						<p className="ml-4">Pagos</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideBar;
