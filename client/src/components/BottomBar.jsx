import { Link, useLocation } from "react-router-dom";
const BottomBar = () => {
	const location = useLocation();
	return (
		<footer className="py-4 bg-black sticky bottom-0">
			<div className="mx-auto max-w-md h-8 flex items-center">
				<Link
					to={"/"}
					className="basis-1/4 flex justify-center hover:cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={`${location.pathname === "/" ? "#39BFF0" : "white"}`}
						strokeWidth="2"
						strokeLinecap="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-message hover:stroke-secundario"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M8 9h8" />
						<path d="M8 13h6" />
						<path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
					</svg>
				</Link>
				<Link
					to={"/busqueda"}
					className="basis-1/4 flex justify-center hover:cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={`${
							location.pathname === "/busqueda" ? "#39BFF0" : "white"
						}`}
						strokeWidth="2"
						strokeLinecap="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-search hover:stroke-secundario"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
						<path d="M21 21l-6 -6" />
					</svg>
				</Link>
				<Link
					to={"/noticias"}
					className="basis-1/4 flex justify-center hover:cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={`${
							location.pathname === "/noticias" ? "#39BFF0" : "white"
						}`}
						strokeWidth="2"
						strokeLinecap="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-align-box-bottom-center hover:stroke-secundario"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
						<path d="M9 15v2" />
						<path d="M12 11v6" />
						<path d="M15 13v4" />
					</svg>
				</Link>
				<Link
					to={"/cursos"}
					className="basis-1/4 flex justify-center hover:cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke={`${location.pathname === "/cursos" ? "#39BFF0" : "white"}`}
						strokeWidth="2"
						strokeLinecap="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-message hover:stroke-secundario"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M8 9h8" />
						<path d="M8 13h6" />
						<path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
					</svg>
				</Link>
			</div>
		</footer>
	);
};

export default BottomBar;
