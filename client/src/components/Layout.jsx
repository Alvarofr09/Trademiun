import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Layout() {
	const { auth, logout } = useAuthContext();
	console.log(auth);
	return (
		<div>
			<nav>
				{auth && (
					<>
						<Link className="link" to="/">
							Personajes
						</Link>
						<button onClick={logout}>Logout</button>
					</>
				)}
			</nav>

			<main className="app">
				<Outlet />
			</main>
		</div>
	);
}
