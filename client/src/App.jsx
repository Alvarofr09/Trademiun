import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import RequireAuth from "./components/RequireAuth";
import WebChat from "./views/WebChat";
import UserDetails from "./views/UserDetails";

import Busqueda from "./views/Busqueda";
import CommingSoon from "./views/CommingSoon";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />

					<Route element={<RequireAuth />}>
						<Route path="/" element={<WebChat />} />
						<Route path="/busqueda" element={<Busqueda />} />
						<Route path="/noticias" element={<CommingSoon />} />
						<Route path="/cursos" element={<CommingSoon />} />
						<Route path="/user/:id" element={<UserDetails />} />
						{/* <Route path="/pagos" element={<CommingSoon />} /> */}
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
