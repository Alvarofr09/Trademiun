import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./views/Login";
import RequireAuth from "./components/RequireAuth";
import Chat from "./views/Chat";
import UserDetails from "./views/UserDetails";
import CreateGroup from "./views/CreateGroup";

import WebBuscador from "./views/WebBuscador";
import WebToggle from "./components/WebForms/WebToggle";

// import WebNoticias from "./views/WebNoticias";
// import Trades from "./views/Trades";
// import Buscador from "./views/Buscador";

function App() {
	return (
		<>
			{/* <WebNoticias /> */}
			{/* <Trades /> */}
			{/* <Buscador /> */}
			{/* <WebBuscador /> */}
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />

					<Route path="login2" element={<WebToggle />} />

					<Route element={<RequireAuth />}>
						<Route path="/" element={<Chat />} />
						<Route path="/busqueda" element={<WebBuscador />} />
						{/* <Route path="/noticias" element={<CommingSoon />} /> */}
						{/* <Route path="/cursos" element={<CommingSoon />} /> */}
						<Route path="/user/:id" element={<UserDetails />} />
						<Route path="/create-group/:id" element={<CreateGroup />} />
						{/* <Route path="/pagos" element={<CommingSoon />} /> */}
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;
