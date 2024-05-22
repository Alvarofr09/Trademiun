import { useState } from "react";
import WebRegistro from "../components/WebForms/WebRegistro";
import WebLogin from "../components/WebForms/WebLogin";

export default function LoginWeb() {
	const [view, setView] = useState("login");

	return (
		<div className="h-screen flex flex-col items-center justify-evenly">
			{view === "login" ? (
				<WebLogin setView={setView} />
			) : (
				<WebRegistro setView={setView} />
			)}
		</div>
	);
}
