import ButtonVerMas from "../components/ButtonVerMas";
import CardMasRentables from "../components/CardMasRentables";
import CardSeguidores from "../components/CardSeguidores";

import InputSearch from "../components/ui/InputSearch";

export default function MobileBuscador() {
	return (
		<div className="mx-auto max-w-md h-full bg-primario">
			<InputSearch />
			<h2 className="text-center text-2xl font-bold text-white p-4">
				Top Seguidores
			</h2>
			<CardSeguidores />
			<CardSeguidores />
			<ButtonVerMas />
			<h2 className="text-center text-2xl font-bold text-white p-4">
				Más Rentables
			</h2>
			<CardMasRentables />
			<CardMasRentables />
			<ButtonVerMas />
		</div>
	);
}
