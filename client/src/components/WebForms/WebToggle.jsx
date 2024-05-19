import { useState } from "react";
import WebRegistro from "./WebRegistro";
import WebLogin from "./WebLogin";

export default function WebToggle() {
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
