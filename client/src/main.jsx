import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import AuthContextProvider from "./context/AuthContext";
// import ChatContextProvider from "./context/ChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContextProvider>
				{/* <ChatContextProvider> */}
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
				{/* </ChatContextProvider> */}
			</AuthContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
