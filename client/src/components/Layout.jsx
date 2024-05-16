import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import SideBar from "./SideBar";

export default function Layout() {
	const { auth } = useAuthContext();
	return (
		<div>
			<nav>
				{auth ? (
					<>
						<div className="flex">
							<div className="basis-2/12 mx-auto">
								<SideBar />
							</div>

							<main className="basis-10/12 mx-auto">
								<Outlet />
							</main>
						</div>
					</>
				) : (
					<main className="app">
						<Outlet />
					</main>
				)}
			</nav>
		</div>
	);
}
