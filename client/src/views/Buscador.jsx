import ButtonVerMas from "../components/ButtonVerMas";
import CardMasRentables from "../components/CardMasRentables";
import CardSeguidores from "../components/CardSeguidores";
import Footer from "../components/Footer";
import InputSearch from "../components/InputSearch";
// import VerMasBoton from "../components/VerMasBoton";

const Buscador = () => {
  return (
    <div className="mx-auto max-w-md h-3/5 bg-primario">
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
      <Footer />
    </div>
  );
};

export default Buscador;
