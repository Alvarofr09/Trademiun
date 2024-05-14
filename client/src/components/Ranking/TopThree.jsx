import PodiumAvatar from "./PodiumAvatar";

export default function TopThree({ user, seguidores }) {
	return (
		<div className="basis-1/3 flex flex-col justify-end">
			<PodiumAvatar image={user.image} ranking={user.ranking} />
			<div className="bg-fondoWebApp h-36 pb-4 rounded-tr-xl text-2xl flex justify-center text-center items-end text-primario font-bold">
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
