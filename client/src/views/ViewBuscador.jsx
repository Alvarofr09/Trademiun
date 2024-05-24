import useDeviceType from "../hooks/useDeviceType";
import MobileBuscador from "./MobileBuscador";
import WebBuscador from "./WebBuscador";

export default function ViewBuscador() {
	const isMobile = useDeviceType();
	return <>{isMobile ? <MobileBuscador /> : <WebBuscador />}</>;
}
