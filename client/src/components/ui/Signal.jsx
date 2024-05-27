import { useState } from "react";
import Img from "./CloudinaryImg";

export default function Signal({ signal, isMessage }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<div
			key={signal.id}
			className={`signal text-left  flex items-center justify-end ${
				isMessage
					? "max-w-[80%] md:max-w-[60%] my-4"
					: "max-w-[80%] mx-auto centered my-8"
			}`}
		>
			<div className="content bg-fondoWebApp dark:bg-terciario break-normal dark:text-white text-terciario py-5 px-10 text-2xl rounded-2xl">
				{signal.image && (
					<Img
						isContact={false}
						uploadedImg={signal.image}
						className="w-full "
					/>
				)}
				{signal.description && (
					<p
						className={`text-xs mb-2 cursor-pointer ${
							isExpanded ? "line-clamp-none" : "line-clamp-3"
						} overflow-hidden`}
						onClick={handleToggle}
					>
						{signal.description}
					</p>
				)}

				<p>
					<strong>Moneda: </strong> {signal.moneda}
				</p>
				<p>
					<strong>Riesgo: </strong> {signal.riesgo}%
				</p>
				<p>
					<strong>Entrada: </strong> {signal.entrada}
				</p>
				<p>
					<strong>SL: </strong> {signal.stopLoss}
				</p>
				<p>
					<strong>TP: </strong> {signal.takeProfit}
				</p>
				<p
					className={`titulo ${
						signal.isCompra ? "text-[#30BC30]" : "text-[#C73232]"
					} `}
				>
					{signal.isCompra ? "COMPRA" : "VENTA"}
				</p>
			</div>
		</div>
	);
}
