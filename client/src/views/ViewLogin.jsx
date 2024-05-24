import WebToggle from "./LoginWeb";
import MobileLogin from "./MobileLogin";
import useDeviceType from "../hooks/useDeviceType";

export default function ViewLogin() {
	const isMobile = useDeviceType();
	return (
		<>
			{isMobile ? (
				<div className="background h-screen w-screen">
					<MobileLogin />
				</div>
			) : (
				<WebToggle />
			)}
		</>
	);
}
