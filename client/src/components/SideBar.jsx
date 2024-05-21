import { Link, useLocation } from "react-router-dom";
import logo_negro from "../assets/img/logo_negro.png";
import LogoChico from "../assets/img/LogoChico.png";

import { IconMessage, IconMessageFilled } from "@tabler/icons-react";
import { IconSearch, IconZoomFilled } from "@tabler/icons-react";
import { IconNews, IconArticleFilled } from "@tabler/icons-react";
import {
	IconHexagonLetterB,
	IconHexagonLetterBFilled,
} from "@tabler/icons-react";
import { IconUser, IconUserFilled } from "@tabler/icons-react";
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react";
import { IconCreditCard, IconCreditCardFilled } from "@tabler/icons-react";
import { IconLogout } from "@tabler/icons-react";

import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";

const SideBar = () => {
	const { user } = useUserContext();
	const { logout } = useAuthContext();
	const location = useLocation();
	return (
		<>
			<div className="max-w-68 h-lvh sticky md:text-base lg:text-lg text-2xl top-0 bg-white">
				{/* Sidebar */}
				<div className="hidden lg:block py-8 w-36 xl:w-44 ml-12 mr-2">
					<img className="" src={logo_negro} alt="logo" />
				</div>
				<img
					className="ml-4 md:ml-6 lg:ml-12 py-8 block lg:hidden"
					src={LogoChico}
					alt="Logo"
				/>

				<Link to={"/"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/" ? (
							<IconMessageFilled size={24} className="ml-4 md:ml-6 lg:ml-12" />
						) : (
							<IconMessage size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/" && "font-bold"
							}`}
						>
							Chats
						</p>
					</div>
				</Link>

				<Link to={"/busqueda"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/busqueda" ? (
							<IconZoomFilled size={24} className="ml-4 md:ml-6 lg:ml-12" />
						) : (
							<IconSearch size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/busqueda" && "font-bold"
							}`}
						>
							Búsqueda
						</p>
					</div>
				</Link>

				<Link to={"/noticias"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/noticias" ? (
							<IconArticleFilled size={24} className="ml-4 md:ml-6 lg:ml-12" />
						) : (
							<IconNews size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/noticias" && "font-bold"
							}`}
						>
							Noticias
						</p>
					</div>
				</Link>

				<Link to={"/blog"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/blog" ? (
							<IconHexagonLetterBFilled
								size={24}
								className="ml-4 md:ml-6 lg:ml-12"
							/>
						) : (
							<IconHexagonLetterB size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/blog" && "font-bold"
							}`}
						>
							Blog
						</p>
					</div>
				</Link>

				<Link
					to={`/user/${user.id}`}
					className="flex hover:cursor-pointer mb-8"
				>
					<div>
						{location.pathname === `/user/${user.id}` ? (
							<IconUserFilled size={24} className="ml-4 md:ml-6 lg:ml-12" />
						) : (
							<IconUser size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === `/user/${user.id}` && "font-bold"
							}`}
						>
							User
						</p>
					</div>
				</Link>

				<Link to={"/cursos"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/cursos" ? (
							<IconPlayerPlayFilled
								size={24}
								className="ml-4 md:ml-6 lg:ml-12"
							/>
						) : (
							<IconPlayerPlay size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/cursos" && "font-bold"
							}`}
						>
							Cursos
						</p>
					</div>
				</Link>

				<Link to={"/pagos"} className="flex hover:cursor-pointer mb-8">
					<div>
						{location.pathname === "/pagos" ? (
							<IconCreditCardFilled
								size={24}
								className="ml-4 md:ml-6 lg:ml-12"
							/>
						) : (
							<IconCreditCard size={24} className="ml-4 md:ml-6 lg:ml-12" />
						)}
					</div>
					<div>
						<p
							className={`md:hidden lg:block ml-4 ${
								location.pathname === "/pagos" && "font-bold"
							}`}
						>
							Pagos
						</p>
					</div>
				</Link>
				<div
					onClick={() => logout()}
					className="flex hover:cursor-pointer mb-8"
				>
					<div>
						<IconLogout size={24} className="ml-4 md:ml-6 lg:ml-12" />
					</div>
					<div>
						<p className={`md:hidden lg:block ml-4 `}>Logout </p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideBar;
