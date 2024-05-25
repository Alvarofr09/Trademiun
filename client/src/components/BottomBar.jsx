import { Link, useLocation } from "react-router-dom";
import {
	IconMessage,
	IconMessageFilled,
	IconSearch,
	IconZoomFilled,
	IconNews,
	IconArticleFilled,
	IconPlayerPlay,
	IconPlayerPlayFilled,
	IconUser,
	IconUserFilled,
} from "@tabler/icons-react";
import { useUserContext } from "../context/UserContext";
import ThemeToggleButton from "./ui/ToggleTheme"; // Importa el botón de cambio de tema
import useThemeToggle from "../hooks/useThemeToggle";

export default function BottomBar() {
	const { user } = useUserContext();
	const location = useLocation();
	const [theme] = useThemeToggle();
	const routes = [
		{ path: "/", icon: IconMessage, iconFilled: IconMessageFilled },
		{ path: "/busqueda", icon: IconSearch, iconFilled: IconZoomFilled },
		{ path: "/noticias", icon: IconNews, iconFilled: IconArticleFilled },
		{ path: "/cursos", icon: IconPlayerPlay, iconFilled: IconPlayerPlayFilled },
		{ path: `/user/${user.id}`, icon: IconUser, iconFilled: IconUserFilled },
	];

	return (
		<footer
			className={`py-4 bg-white ${
				theme === "dark" ? "dark:bg-primario" : ""
			} fixed bottom-0 left-0 w-full`}
		>
			<div className="mx-auto max-w-md h-8 flex items-center justify-between">
				{routes.map(({ path, icon: Icon, iconFilled: IconFilled }) => (
					<Link
						key={path}
						to={path}
						className="flex-grow flex justify-center hover:cursor-pointer dark:text-white"
					>
						{location.pathname === path ? (
							<IconFilled size={24} color="#39BFF0" />
						) : (
							<Icon size={24} />
						)}
					</Link>
				))}
				{/* Botón de cambio de tema */}
				<div className="flex-grow flex justify-center hover:cursor-pointer">
					<ThemeToggleButton />
				</div>
			</div>
		</footer>
	);
}
