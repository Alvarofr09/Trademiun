import PodiumAvatar from "./PodiumAvatar";

export default function TopOne({ user, seguidores }) {
	console.log(user);
	return (
		<div className="flex flex-col justify-between">
			<PodiumAvatar image={user.image} ranking={user.ranking} />
			<div className=" bg-primario rounded-lg w-44 2xl:w-48 h-36 flex justify-center text-center items-end text-white font-bold">
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
