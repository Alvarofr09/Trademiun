import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				<UserContextProvider>
					<Routes>
						<Route path="/*" element={<App />} />
					</Routes>
				</UserContextProvider>
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
