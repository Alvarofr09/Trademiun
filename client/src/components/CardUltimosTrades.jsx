import grafica from "../assets/img/tradesView/grafica.png";

export default function CardUltimosTrades() {
	return (
		<section className="py-2 mb-4 mx-4 flex flex-col bg-terciario rounded-3xl max-w-xl ">
			<div className="mx-auto">
				<div className="flex ">
					<div className="basis-2/3 flex justify-center">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-transparent"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt="avatar"
						/>
						<div>
							<h6 className="inline-block ml-3 text-white text-start">
								Parras trades
							</h6>
							<p className="text-tipografia text-start mb-2 ml-3">
								9.350 seguidores
							</p>
						</div>
					</div>
					<div className="basis-1/3 mr-2">
						<button className="bg-white ml-2 text-center rounded-3xl h-8 w-28 ">
							Seguir
						</button>
					</div>
				</div>

				<div className="w-full p-4 flex justify-center ">
					<img className="rounded-xl" src={grafica} alt="grafica" />
				</div>

				<div className="px-8 xl:px-24 pb-4 text-white rounded-full">
					<p className="text-start">
						Con este impulso, bitcoin podría ir a la zona de los 30k 35k el
						mercado probará la presión bajista. De haberlo, cosa probable, el
						precio puede volver a la zona de los 20k o ir más...
					</p>
				</div>
			</div>
		</section>
	);
}
