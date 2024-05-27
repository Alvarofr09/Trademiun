import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<UserContextProvider>
					<SocketProvider>
						<Routes>
							<Route path="/*" element={<App />} />
						</Routes>
					</SocketProvider>
				</UserContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
