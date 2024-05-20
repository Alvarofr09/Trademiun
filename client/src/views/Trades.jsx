import CardUltimosTrades from "../components/CardUltimosTrades";
import Footer from "../components/Footer";
import InputSearch from "../components/InputSearch";
const Trades = () => {
  return (
    <div className="mx-auto w-full h-3/5 bg-primario">
      <InputSearch />
      <h2 className="text-center text-2xl font-bold text-white p-4">
        Últimos trades
        <span className="text-secundario text-sm ml-1">Ver todos</span>
      </h2>
      <CardUltimosTrades />
      <CardUltimosTrades />
      <CardUltimosTrades />
      <Footer />
    </div>
  );
};

export default Trades;
