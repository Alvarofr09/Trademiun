import { useEffect, useState } from "react";
import Img from "./ui/CloudinaryImg";
import { useUserContext } from "../context/UserContext";
import {
	followRoute,
	isFollowingRoute,
	unFollowRoute,
	userApi,
} from "../api/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import UnFollowButton from "./ui/UnFollowButton";
import FollowButton from "./ui/FollowButton";

const toastConfig = {
	position: "bottom-right",
	autoClose: 5000,
	pauseOnHover: true,
	draggable: true,
	theme: "dark",
};

export default function CardUser({ seguidores, usuario }) {
	const { user } = useUserContext();
	const [isFollowing, setIsFollowing] = useState(false);

	useEffect(() => {
		async function fetchData() {
			if (usuario.id != user.id) {
				const isFollowingResponse = await userApi.post(isFollowingRoute, {
					user_id: user.id,
					to_check: usuario.id,
				});
				setIsFollowing(isFollowingResponse.data.isFollowing);
			}
		}

		fetchData();
	}, [user.id, usuario.id]);

	const handleFollow = async (e) => {
		e.stopPropagation();
		try {
			const response = await userApi.post(followRoute, {
				user_id: user.id,
				to_follow: usuario.id,
			});

			if (response.status) {
				setIsFollowing(true);
				toast.success(`Siguiendo a ${usuario.username}`, toastConfig);
			}
		} catch (error) {
			toast.error(`Error al seguir: ${error.message}`, toastConfig);
		}
	};

	const handleUnfollow = async (e) => {
		e.stopPropagation();
		try {
			await userApi.post(unFollowRoute, {
				user_id: user.id,
				to_unfollow: usuario.id,
			});
			setIsFollowing(false);
			// setIsInGroup(false);
			toast.success(`Dejaste de seguir a ${usuario.username}`, toastConfig);
		} catch (error) {
			toast.error(`Error al dejar de seguir: ${error.message}`, toastConfig);
		}
	};

	return (
		<>
			<section className="py-2 mx-2">
				<div className="flex flex-row max-w-xl mx-auto p-2 bg-fondoWebApp dark:bg-terciario rounded-full">
					<div className="ml-1 self-center">
						<Img
							className="inline-block h-20 w-20 rounded-full ring-2 ring-transparent basis-4/12"
							alt="avatar"
							uploadedImg={usuario.image}
						/>
					</div>

					<div className="mb-2 ml-4 basis-4/12">
						<h6 className="inline-block ml-3 text-primario dark:text-white font-bold text-start">
							{usuario.username}
						</h6>
						<p className="dark:text-tipografia text-terciario text-start ml-3 mb-2 ">
							{usuario.seguidores} seguidores
						</p>
						{isFollowing ? (
							<UnFollowButton handleUnfollow={handleUnfollow} />
						) : (
							<FollowButton handleFollow={handleFollow} />
						)}
					</div>
					<div className="mb-2 ml-4 basis-4/12">
						{seguidores ? (
							<>
								<h3 className="text-secundario text-xl font-bold mt-4 ml-8">
									{usuario.seguidores}{" "}
								</h3>
								<p className="dark:text-tipografia text-terciario ml-4">
									seguidores
								</p>
							</>
						) : (
							<>
								<h3 className="text-secundario text-xl font-bold mt-4 ml-8">
									{usuario.rentabilidad}%
								</h3>
								<p className="dark:text-tipografia text-terciario ml-4">
									rentabilidad
								</p>
							</>
						)}
					</div>
				</div>
			</section>
			<ToastContainer />
		</>
	);
}
