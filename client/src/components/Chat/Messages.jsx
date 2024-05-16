import { v4 as uuidv4 } from "uuid";
import Signal from "../ui/Signal";
import { parseISO, format, isToday } from "date-fns";

const fechaFormateada = (fecha) => {
	// Convertir la cadena de fecha y hora a un objeto Date
	const fechaObj = parseISO(fecha);

	// Verificar si la fecha es hoy
	const esHoy = isToday(fechaObj);

	// Formatear la fecha según si es hoy o no
	const formato = esHoy ? "HH:mm:ss" : "dd/MM HH:mm:ss";
	const fechaFormateada = format(fechaObj, formato);

	return fechaFormateada;
};

export default function Messages({ messages, scrollRef }) {
	return (
		<div className="chat-messages bg-white scrollbar-custom py-4 px-8 flex flex-col gap-4 overflow-auto">
			{messages.map((message) => {
				console.log(message);
				return (
					<div
						ref={scrollRef}
						key={uuidv4()}
						className={`${message.type === "signal" && "flex"} ${
							message.fromSelf ? "sended" : "recieved"
						}`}
					>
						{message.type === "message" ? (
							<div
								className={`flex items-center mensaje ${
									message.fromSelf ? "sended" : "recieved"
								}`}
							>
								<div className="content max-w-[60%] break-normal text-lg flex flex-col rounded-2xl text-[#000000] p-4">
									{/* <span className="text-xs">
										{message.fromSelf ? "Tu" : message.username}
									</span> */}
									{message.message}
									<span className="text-xs">
										{fechaFormateada(message.date)}
									</span>
								</div>
							</div>
						) : (
							<Signal signal={message} isMessage={true} />
						)}
					</div>
				);
			})}
		</div>
	);
}
