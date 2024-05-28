import useDeviceType from "../hooks/useDeviceType";
import MobileNoticias from "./MobileNoticias";
import WebBlog from "./WebBlog";

export default function ViewNoticias() {
	const isMobile = useDeviceType();
	return (
		<>
			{isMobile ? (
				<div className="background h-screen w-screen">
					<MobileNoticias />
				</div>
			) : (
				<WebBlog />
			)}
		</>
	);
}
