import { v4 as uuidv4 } from "uuid";

export default function Messages({ messages, scrollRef }) {
	return (
		<div className="chat-messages bg-white scrollbar-custom py-4 px-8 flex flex-col gap-4 overflow-auto">
			{messages.map((message) => {
				console.log(message);
				return (
					<div ref={scrollRef} key={uuidv4()}>
						<div
							className={`  flex items-center ${
								message.fromSelf ? "sended" : "recieved"
							} ${message.type === "signal" ? "signal" : "mensaje"}`}
						>
							<div
								className={`content max-w-[60%] break-normal text-lg rounded-2xl  ${
									message.type === "signal"
										? "text-[#ffffff] py-5 px-10"
										: "text-[#000000] p-4 "
								}`}
							>
								{message.type === "message" ? (
									message.message
								) : (
									<>
										{message.image && <img src={message.image} alt="" />}
										{message.description && <p>{message.description}</p>}

										<p>
											<strong>Moneda: </strong> {message.moneda}
										</p>
										<p>
											<strong>Riesgo: </strong> {message.riesgo}%
										</p>
										<p>
											<strong>Entrada: </strong> {message.entrada}
										</p>
										<p>
											<strong>SL: </strong> {message.stopLoss}
										</p>
										<p>
											<strong>TP: </strong> {message.takeProfit}
										</p>
										<p
											className={`titulo ${
												message.isCompra ? "text-emerald-600" : "text-red-600"
											} `}
										>
											{message.isCompra ? "COMPRA" : "VENTA"}
										</p>
									</>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
