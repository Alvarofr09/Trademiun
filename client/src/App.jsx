import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import WebChat from "./views/WebChat";

import CommingSoon from "./views/CommingSoon";
import WebPagos from "./views/WebPagos";
import ViewLogin from "./views/ViewLogin";
import ViewPerfil from "./views/ViewPerfil";
import ViewBuscador from "./views/ViewBuscador";
import ViewNoticias from "./views/ViewNoticias";
import WebBlog from "./views/WebBlog";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<ViewLogin />} />

					<Route element={<RequireAuth />}>
						<Route path="/" element={<WebChat />} />
						<Route path="/busqueda" element={<ViewBuscador />} />
						<Route path="/noticias" element={<ViewNoticias />} />
						<Route path="/blog" element={<WebBlog />} />
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
