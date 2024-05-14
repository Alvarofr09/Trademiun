import PodiumAvatar from "./PodiumAvatar";

export default function TopTwo({ user, seguidores }) {
	return (
		<div className="flex flex-col justify-between">
			<PodiumAvatar image={user.image} ranking={user.ranking} />
			<div className="bg-fondoWebApp rounded-lg mt-4 w-44 2xl:w-48 h-24 flex justify-center text-center items-end text-primario font-bold">
				<div>
					<p>{user.username}</p>
					{seguidores ? (
						<h6>{user.seguidores}</h6>
					) : (
						<h6>{user.rentabilidad}%</h6>
					)}
				</div>
			</div>
		</div>
	);
}
