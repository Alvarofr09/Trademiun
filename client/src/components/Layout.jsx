import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import SideBar from "./SideBar";
import useDeviceType from "../hooks/useDeviceType";
import BottomBar from "./BottomBar";

export default function Layout() {
	const { auth } = useAuthContext();
	const isMobile = useDeviceType();
	return (
		<div>
			<nav>
				{auth ? (
					isMobile ? (
						<div className="flex flex-col h-screen">
							<main className="basis-11/12 ">
								<Outlet />
							</main>
							<div className="w-full basis-1/12 mx-auto">
								<BottomBar />
							</div>
						</div>
					) : (
						// Contenido para usuarios autenticados en dispositivos de escritorio
						<div className="flex">
							<div className="basis-1/12 mx-auto">
								<SideBar />
							</div>
							<main className="basis-11/12 mx-auto">
								<Outlet />
							</main>
						</div>
					)
				) : (
					<main className="app">
						<Outlet />
					</main>
				)}
			</nav>
		</div>
	);
}
