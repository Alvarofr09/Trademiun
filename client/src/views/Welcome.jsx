import Robot from "../assets/robot.gif";
import { useUserContext } from "../context/UserContext";

export default function Welcome() {
	const { user } = useUserContext();
	return (
		<div className="centered h-full flex-col dark:text-white text-primario dark:bg-primario">
			<img className="w-[20rem] h-[20rem]" src={Robot} alt="Robot" />
			<h1 className="text-3xl">
				Welcome, <span className="text-secundario">{user.username}!</span>
			</h1>
			<h3>Please, select a chat to start messaging.</h3>
		</div>
	);
}
