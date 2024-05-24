import CardUltimosTrades from "../components/CardUltimosTrades";
import InputSearch from "../components/InputSearch";

export default function MobileNoticias() {
	return (
		<div className="mx-auto max-w-full h-3/5 bg-primario">
			<InputSearch />
			<h2 className="text-center text-2xl font-bold text-white p-4">
				Últimos trades
				<span className="text-secundario text-sm ml-1">Ver todos</span>
			</h2>
			<div className="flex flex-col justify-center items-center">
				<CardUltimosTrades />
				<CardUltimosTrades />
				<CardUltimosTrades />
			</div>
		</div>
	);
}
