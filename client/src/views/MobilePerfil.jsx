import { useState, useRef, useEffect } from "react";
import Img from "../components/ui/CloudinaryImg";
import RangeInput from "../components/ui/RangeInput";
import { useUserContext } from "../context/UserContext";
import { IconEdit } from "@tabler/icons-react";

export default function MobilePerfil() {
	const [editing, setEditing] = useState(false);
	const [userName, setUserName] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const inputRef = useRef(null);
	const textareaRef = useRef(null);
	const { user } = useUserContext();

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);

	useEffect(() => {
		if (user) {
			setDescripcion(user.descripcion);
			setUserName(user.username);
		}
	}, [user]);

	function handleClick() {
		setEditing(true);
	}

	console.log(user);

	return (
		<div className="relative mx-auto w-full h-full bg-primario pb-20">
			<div className="absolute top-0 right-0 p-4">
				<IconEdit color="#ffffff" onClick={handleClick} />
			</div>
			<div className="flex justify-center pt-8">
				<Img
					uploadedImg={user.image}
					alt="foto perfil"
					className={"w-40 h-40 rounded-full"}
				/>
			</div>

			<div className="centered flex-col py-4 gap-3 ">
				<input
					ref={inputRef}
					type="text"
					className={`text-center bg-primario w-fit  text-white text-3xl font-bold focus:border-white ${
						editing ? "border-2 border-white " : "border-none"
					}`}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					disabled={!editing}
				/>
			</div>
			<div className="">
				<h4 className="text-center text-tipografia text-sm mb-4">
					{user.seguidores} seguidores
				</h4>
			</div>

			<div className="p-4">
				<RangeInput title={"Maximo Drawdown"} value={66.6} max={100} />
				<RangeInput title={"Riesgo/Beneficio medio"} value={3.5} max={4} />
				<RangeInput title={"% Mensual medio"} value={66.6} max={100} />
				<RangeInput title={"% Riesgo medio/trade"} value={311} max={311} />
			</div>

			{/* <ProgressBar titulo="Máximo Drawdown" porcentaje="66.6%" />
			<ProgressBar titulo="Riesgo/Beneficio medio" porcentaje="90.7%" />
			<ProgressBar titulo="% Mensual medio" porcentaje="77%" />
			<ProgressBar titulo="% Riesgo medio/trade" porcentaje="83.3%" /> */}

			<div className="mb-4">
				<textarea
					ref={textareaRef}
					className={`w-full bg-primario text-white p-2 rounded-lg focus:border-white ${
						editing ? "border-2 border-white " : "border-none"
					}`}
					rows="4"
					value={descripcion}
					onChange={(e) => setDescripcion(e.target.value)}
					disabled={!editing}
				/>
			</div>

			<div>
				<button className="text-white bg-secundario px-4 py-2 rounded-xl ml-2">
					Añadir trade
				</button>
			</div>
		</div>
	);
}
