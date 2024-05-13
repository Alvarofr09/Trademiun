export default function Signal({ signal }) {
	return (
		<div key={signal.id} className="signal max-w-[80%] mx-auto my-8">
			<div className="content break-normal text-white py-5 px-10 text-lg rounded-2xl">
				{signal.image && <img src={signal.image} alt="" />}
				{signal.description && <p>{signal.description}</p>}

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
						signal.isCompra ? "text-emerald-600" : "text-red-600"
					} `}
				>
					{signal.isCompra ? "COMPRA" : "VENTA"}
				</p>
			</div>
		</div>
	);
}
