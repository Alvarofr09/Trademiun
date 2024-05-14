export default function PodiumAvatar({ image, ranking }) {
	return (
		<div className="relative flex justify-center">
			<img
				className="inline-block h-24 w-24 rounded-full filter brightness-50 contrast-150"
				src={image}
				alt="avatar"
			/>
			<h1 className="absolute text-white inset-0 text-3xl text-center ">
				{ranking}
			</h1>
		</div>
	);
}
