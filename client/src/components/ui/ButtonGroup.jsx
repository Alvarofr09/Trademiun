import { useState } from "react";

import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

export default function ButtonGroup() {
	const [view, setView] = useState("login");

	return (
		<div className="h-screen flex flex-col items-center justify-evenly">
			<div className="brand mt-12">
				<h1 className="titulo">Trademiun</h1>
			</div>
			{view === "login" ? <LoginForm /> : <RegisterForm />}
			<div className="flex flex-row gap-4 mb-12 rounded-3xl bg-[#2e2d2d] ">
				<button
					onClick={() => setView("login")}
					className={`px-4 rounded-3xl py-2 transition ease-in-out duration-300 ${
						view === "login"
							? "bg-white text-[#2e2d2d]"
							: "bg-transparent text-white"
					}`}
				>
					Login
				</button>
				<button
					onClick={() => setView("register")}
					className={`px-4 rounded-3xl py-2 transition ease-in-out duration-300 ${
						view === "register"
							? "bg-white text-[#2e2d2d]"
							: "bg-transparent text-white"
					}`}
				>
					Register
				</button>
			</div>
		</div>
	);
}
