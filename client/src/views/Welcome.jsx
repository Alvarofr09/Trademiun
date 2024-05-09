import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
	return (
		<div className="centered flex-col text-white">
			<img className="w-[20rem] h-[20rem]" src={Robot} alt="Robot" />
			<h1 className="text-3xl">
				Welcome, <span className="text-[#4e00ff]">{currentUser.username}!</span>
			</h1>
			<h3>Please, select a chat to start messaging.</h3>
		</div>
	);
}
