import WebPerfil from "./WebPerfil";
import MobilePerfil from "./MobilePerfil";
import useDeviceType from "../hooks/useDeviceType";

export default function ViewPerfil() {
	const isMobile = useDeviceType();
	return <>{isMobile ? <MobilePerfil /> : <WebPerfil />}</>;
}
