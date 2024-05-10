// import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { IconLogout } from "@tabler/icons-react";

export default function Logout() {
	const { logout } = useAuthContext();
	return (
		<button className="centered p-2 rounded-[0.5rem] bg-[#9a86f3] cursor-pointer">
			<IconLogout
				color="#ebe7ff"
				onClick={() => {
					logout();
				}}
			/>
		</button>
	);
}
