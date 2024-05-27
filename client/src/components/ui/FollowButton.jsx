export default function FollowButton({ handleFollow }) {
	return (
		<button
			className="bg-white ml-2 dark:text-tipografia text-terciario text-center font-bold rounded-3xl w-24"
			onClick={(e) => handleFollow(e)}
		>
			Seguir
		</button>
	);
}
