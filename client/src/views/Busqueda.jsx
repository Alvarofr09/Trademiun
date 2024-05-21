import useDeviceType from "../hooks/useDeviceType";
import Buscador from "./Buscador";
import WebBuscador from "./WebBuscador";

export default function Busqueda() {
	const isMobile = useDeviceType();
	return <>{isMobile ? <Buscador /> : <WebBuscador />}</>;
}
