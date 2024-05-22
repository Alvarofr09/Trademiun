import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import WebChat from "./views/WebChat";

import CommingSoon from "./views/CommingSoon";
import WebPagos from "./views/WebPagos";
import WebNoticias from "./views/WebNoticias";
import ViewLogin from "./views/ViewLogin";
import ViewPerfil from "./views/ViewPerfil";
import ViewBuscador from "./views/ViewBuscador";

function App() {
	return (
		<>
			{/* <MovilPerfil /> */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<ViewLogin />} />

					<Route element={<RequireAuth />}>
						<Route path="/" element={<WebChat />} />
						<Route path="/busqueda" element={<ViewBuscador />} />
						<Route path="/noticias" element={<WebNoticias />} />
						<Route path="/cursos" element={<CommingSoon />} />
						<Route path="/user/:id" element={<ViewPerfil />} />
						<Route path="/pagos" element={<WebPagos />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
