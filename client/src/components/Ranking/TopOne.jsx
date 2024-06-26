import PodiumAvatar from "./PodiumAvatar";

export default function TopOne({ user, seguidores }) {
	return (
		<div className="basis-1/3 flex flex-col justify-end">
			<PodiumAvatar
				userId={user.id}
				image={user.image}
				ranking={user.ranking}
			/>
			<div className=" dark:bg-white bg-primario h-52 pb-4 rounded-t-xl text-2xl flex justify-center text-center items-end dark:text-primario text-white font-bold">
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
