import PodiumAvatar from "./PodiumAvatar";

export default function TopTwo({ user, seguidores }) {
	return (
		<div className="basis-1/3 flex flex-col justify-end">
			<PodiumAvatar image={user.image} ranking={user.ranking} />
			<div className="bg-fondoWebApp pb-4 h-36 rounded-tl-xl text-2xl flex justify-center text-center items-end text-primario font-bold">
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
