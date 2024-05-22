import useDeviceType from "../hooks/useDeviceType";
import MobileNoticias from "./MobileNoticias";
import WebNoticias from "./WebNoticias";

export default function ViewNoticias() {
	const isMobile = useDeviceType();
	return (
		<>
			{isMobile ? (
				<div className="background h-screen w-screen">
					<MobileNoticias />
				</div>
			) : (
				<WebNoticias />
			)}
		</>
	);
}
