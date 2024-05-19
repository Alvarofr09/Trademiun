import WebToggle from "../components/WebForms/WebToggle";
import ButtonGroup from "../components/ui/ButtonGroup";
import useDeviceType from "../hooks/useDeviceType";

export default function Login() {
	const isMobile = useDeviceType();
	return (
		<>
			{isMobile ? (
				<div className="background h-screen w-screen">
					<ButtonGroup />
				</div>
			) : (
				<WebToggle />
			)}
		</>
	);
}
