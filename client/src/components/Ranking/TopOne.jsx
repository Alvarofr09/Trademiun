import PodiumAvatar from "./PodiumAvatar";

export default function TopOne({ user, seguidores }) {
	console.log(user);
	return (
		<div className="basis-1/3 flex flex-col justify-end">
			<PodiumAvatar image={user.image} ranking={user.ranking} />
			<div className=" bg-primario h-52 pb-4 rounded-t-xl text-2xl flex justify-center text-center items-end text-white font-bold">
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
