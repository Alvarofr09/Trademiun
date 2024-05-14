export default function PodiumAvatar({ image, ranking }) {
	return (
		<div className="relative flex justify-center">
			<img
				className={`inline-block h-36 w-36 rounded-full filter brightness-50 contrast-150 ${
					ranking === 1 ? "-mb-16" : "-mb-14"
				}`}
				src={image}
				alt="avatar"
			/>
			<h1 className="absolute text-white font-bold pt-10 inset-0 text-3xl text-center ">
				{ranking}
			</h1>
		</div>
	);
}
