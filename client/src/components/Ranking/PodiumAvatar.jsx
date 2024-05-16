import Img from "../ui/CloudinaryImg";
import { Link } from "react-router-dom";

export default function PodiumAvatar({ userId, image, ranking }) {
	return (
		<div className="relative flex justify-center">
			<Link to={`/user/${userId}`}>
				<Img
					isContact={true}
					className={`inline-block h-36 w-36 rounded-full filter brightness-50 contrast-150 ${
						ranking === 1 ? "-mb-16" : "-mb-14"
					}`}
					uploadedImg={image}
					alt="avatar"
				/>
				<h1 className="absolute text-white font-bold pt-10 inset-0 text-3xl text-center ">
					{ranking}
				</h1>
			</Link>
		</div>
	);
}
