export default function WebNoticias() {
	return (
		<div className="flex h-full">
			<div className="basis-10/12 border-x-2 border-primario flex flex-col">
				<>
					<h1 className="text-center text-3xl font-bold py-8">Noticias</h1>
					<iframe
						className="w-full h-full"
						src="https://sslecal2.investing.com?columns=exc_flags,exc_currency,exc_importance,exc_actual,exc_forecast,exc_previous&features=datepicker,timezone&countries=25,32,6,37,72,22,17,39,14,10,35,43,56,36,110,11,26,12,4,5&calType=week&timeZone=58&lang=1"
					/>
				</>
			</div>

			<div className="basis-2/12  mx-auto">
				<>
					<h1 className="text-center text-3xl font-bold py-8">Divisas</h1>
					<div className="flex justify-center">
						<iframe
							className="w-full h-full"
							src="https://ssltsw.investing.com?lang=4&forex=1,9,6,10,2,5,3&commodities=8830,8836,8831,8849,8833,8832,8851&indices=174,172,27,175,166,23660,179&stocks=474,446,469,345,346,347,348&tabs=1,2,3,4"
						/>
					</div>
				</>
			</div>
		</div>
	);
}
