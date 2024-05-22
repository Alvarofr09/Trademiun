import { Link, useLocation } from "react-router-dom";
import { IconMessage, IconMessageFilled } from "@tabler/icons-react";
import { IconSearch, IconZoomFilled } from "@tabler/icons-react";
import { IconNews, IconArticleFilled } from "@tabler/icons-react";
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";
import { IconUser, IconUserFilled } from "@tabler/icons-react";

import { useUserContext } from "../context/UserContext";

export default function BottomBar() {
	const { user } = useUserContext();
	const location = useLocation();
	return (
		<footer className="py-4 bg-black sticky bottom-0">
			<div className="mx-auto max-w-md h-8 flex items-center">
				<Link
					to={"/"}
					className="basis-1/5 flex justify-center hover:cursor-pointer"
				>
					<div>
						{location.pathname === "/" ? (
							<IconMessageFilled size={24} color="#39BFF0" />
						) : (
							<IconMessage size={24} color="#ffffff" />
						)}
					</div>
				</Link>
				<Link
					to={"/busqueda"}
					className="basis-1/5 flex justify-center hover:cursor-pointer"
				>
					<div>
						{location.pathname === "/busqueda" ? (
							<IconZoomFilled size={24} color="#39BFF0" />
						) : (
							<IconSearch size={24} color="#ffffff" />
						)}
					</div>
				</Link>
				<Link
					to={"/noticias"}
					className="basis-1/5 flex justify-center hover:cursor-pointer"
				>
					<div>
						{location.pathname === "/noticias" ? (
							<IconArticleFilled size={24} color="#39BFF0" />
						) : (
							<IconNews size={24} color="#ffffff" />
						)}
					</div>
				</Link>

				<Link
					to={"/cursos"}
					className="basis-1/5 flex justify-center hover:cursor-pointer"
				>
					<div>
						{location.pathname === "/cursos" ? (
							<IconPlayerPlayFilled size={24} color="#39BFF0" />
						) : (
							<IconPlayerPlay size={24} color="#ffffff" />
						)}
					</div>
				</Link>

				<Link
					to={`/user/${user.id}`}
					className="basis-1/5 flex justify-center hover:cursor-pointer"
				>
					<div>
						{location.pathname === `/user/${user.id}` ? (
							<IconUserFilled size={24} color="#39BFF0" />
						) : (
							<IconUser size={24} color="#ffffff" />
						)}
					</div>
				</Link>
			</div>
		</footer>
	);
}
