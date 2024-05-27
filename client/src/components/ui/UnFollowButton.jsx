export default function UnFollowButton({ handleUnfollow }) {
	return (
		<button
			className="bg-tipografia text-white ml-2 text-center font-bold rounded-3xl w-24"
			onClick={(e) => handleUnfollow(e)}
		>
			Siguiendo
		</button>
	);
}
