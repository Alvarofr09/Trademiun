import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import {
	followRoute,
	isFollowingRoute,
	unFollowRoute,
	userApi,
} from "../api/APIRoutes";
import { toast } from "react-toastify";
import UnFollowButton from "./ui/UnFollowButton";
import FollowButton from "./ui/FollowButton";
import Img from "./ui/CloudinaryImg";

const toastConfig = {
	position: "bottom-right",
	autoClose: 5000,
	pauseOnHover: true,
	draggable: true,
	theme: "dark",
};

export default function CardUltimosTrades({ data }) {
	const { user } = useUserContext();
	const [isFollowing, setIsFollowing] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	console.log(data);

	useEffect(() => {
		async function fetchData() {
			if (data.id != user.id) {
				const isFollowingResponse = await userApi.post(isFollowingRoute, {
					user_id: user.id,
					to_check: data.id,
				});
				setIsFollowing(isFollowingResponse.data.isFollowing);
			}
		}

		fetchData();
	}, [user.id, data.id]);

	const handleFollow = async (e) => {
		e.stopPropagation();
		try {
			const response = await userApi.post(followRoute, {
				user_id: user.id,
				to_follow: data.id,
			});

			if (response.status) {
				setIsFollowing(true);
				toast.success(`Siguiendo a ${data.username}`, toastConfig);
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
				to_unfollow: data.id,
			});
			setIsFollowing(false);
			// setIsInGroup(false);
			toast.success(`Dejaste de seguir a ${data.username}`, toastConfig);
		} catch (error) {
			toast.error(`Error al dejar de seguir: ${error.message}`, toastConfig);
		}
	};
	return (
		<section className="py-2 mb-4 mx-4 flex flex-col bg-fondoWebApp dark:bg-terciario rounded-3xl max-w-xl">
			<div className="mx-auto">
				<div className="centered">
					<div className="basis-2/3 flex justify-center flex-row">
						<Img
							isContact={true}
							uploadedImg={data.user_image}
							alt={data.username}
							className="avatar h-20 w-20"
						/>
						<div className="flex flex-col justify-center">
							<h6 className="inline-block ml-3 text-white text-start">
								{data.username}
							</h6>
							<p className="text-tipografia text-start mb-2 ml-3">
								{data.seguidores} seguidores
							</p>
						</div>
					</div>
					<div className="basis-1/3 mr-2">
						{isFollowing ? (
							<UnFollowButton handleUnfollow={handleUnfollow} />
						) : (
							<FollowButton handleFollow={handleFollow} />
						)}
					</div>
				</div>

				<div className="w-full p-4 flex justify-center ">
					<Img
						isContact={false}
						uploadedImg={data.image}
						alt={`Signal of ${data.username}`}
						className="rounded-xl"
					/>
				</div>

				<div className="px-8 xl:px-24 pb-4 text-terciario dark:text-white rounded-full">
					<p className="text-start">
						<p
							className={`text-xs mb-2 cursor-pointer ${
								isExpanded ? "line-clamp-none" : "line-clamp-3"
							} overflow-hidden`}
							onClick={handleToggle}
						>
							{data.description}
						</p>
					</p>
					<p>
						<strong>Moneda: </strong> {data.moneda}
					</p>
					<p>
						<strong>Riesgo: </strong> {data.riesgo}%
					</p>
					<p>
						<strong>Entrada: </strong> {data.entrada}
					</p>
					<p>
						<strong>SL: </strong> {data.stopLoss}
					</p>
					<p>
						<strong>TP: </strong> {data.takeProfit}
					</p>
					<p
						className={`titulo ${
							data.isCompra ? "text-[#30BC30]" : "text-[#C73232]"
						} `}
					>
						{data.isCompra ? "COMPRA" : "VENTA"}
					</p>
				</div>
			</div>
		</section>
	);
}
