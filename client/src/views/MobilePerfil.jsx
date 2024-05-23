import { useState, useRef, useEffect } from "react";
import Img from "../components/ui/CloudinaryImg";
import RangeInput from "../components/ui/RangeInput";
import { useUserContext } from "../context/UserContext";
import { IconEdit, IconCheck, IconFilePlus } from "@tabler/icons-react";
import { previewFiles } from "../utils/previewFile";
import { useAuthContext } from "../context/AuthContext";
import {
	deleteGroupRoute,
	followRoute,
	getUserInfo,
	getUserSignals,
	hasGroupRoute,
	isFollowingRoute,
	isInGroupRoute,
	joinGroupRoute,
	leaveGroupRoute,
	unFollowRoute,
	updateUserRoute,
	userApi,
} from "../api/APIRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const toastConfig = {
	position: "bottom-right",
	autoClose: 5000,
	pauseOnHover: true,
	draggable: true,
	theme: "dark",
};

export default function MobilePerfil() {
	const { login } = useAuthContext();
	const { user } = useUserContext();
	const { id } = useParams();
	const navigate = useNavigate();
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [userData, setUserData] = useState(null);
	const [signals, setSignals] = useState([]);
	const [editing, setEditing] = useState(false);
	const [userName, setUserName] = useState("");
	const [description, setDescripcion] = useState("");
	const [file, setFile] = useState("");
	const [image, setImage] = useState("");
	const [isFollowing, setIsFollowing] = useState(false);
	const [showGroupModal, setShowGroupModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showJoinModal, setShowJoinModal] = useState(false);
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [hasGroup, setHasGroup] = useState(false);
	const [userGroup, setUserGroup] = useState(null);
	const [isInGroup, setIsInGroup] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		setIsCurrentUser(id == user.id);
	}, [id, user]);

	useEffect(() => {
		async function fetchData() {
			try {
				let userDataResponse = "";
				if (id != user.id) {
					userDataResponse = await userApi.get(`${getUserInfo}/${id}`);
				} else {
					userDataResponse = { data: user };
				}

				console.log(userDataResponse);

				setUserData(userDataResponse.data);

				const signalsResponse = await userApi.get(
					`${getUserSignals}/${userDataResponse.data.id}`
				);
				setSignals(signalsResponse.data);

				const groupData = await userApi.get(
					`${hasGroupRoute}/${userDataResponse.data.id}`
				);
				if (groupData.data.hasGroup) {
					setUserGroup(groupData.data.group_id);
				}
				setHasGroup(groupData.data.hasGroup);

				if (id != user.id) {
					const isFollowingResponse = await userApi.post(isFollowingRoute, {
						user_id: user.id,
						to_check: userDataResponse.data.id,
					});
					setIsFollowing(isFollowingResponse.data.isFollowing);

					const groupStatusResponse = await userApi.post(isInGroupRoute, {
						user_id: user.id,
						group_id: userGroup,
					});
					setIsInGroup(groupStatusResponse.data.inGroup);
				}
			} catch (error) {
				toast.error(`Error fetching data: ${error.message}`, toastConfig);
			}
		}

		fetchData();
	}, [id, user, userGroup]);

	const showGroupForm = () => setShowGroupModal(true);
	const showUserForm = () => setShowUserModal(true);
	const showJoinForm = () => setShowJoinModal(true);
	const showLeaveForm = () => setShowLeaveModal(true);
	const showDeleteForm = () => setShowDeleteModal(true);
	const closeModal = () => {
		setShowGroupModal(false);
		setShowUserModal(false);
		setShowJoinModal(false);
		setShowLeaveModal(false);
		setShowDeleteModal(false);
	};

	const handleDeleteGroup = async () => {
		try {
			await userApi.delete(`${deleteGroupRoute}/${userGroup}`);
			setHasGroup(false);
			toast.success(`Se ha eliminado el grupo`, toastConfig);
			closeModal();
		} catch (error) {
			toast.error(`Error al borrar el usuario: ${error.message}`, toastConfig);
			closeModal();
		}
	};

	const handleFollow = async () => {
		try {
			const response = await userApi.post(followRoute, {
				user_id: user.id,
				to_follow: userData.id,
			});

			if (response.status) {
				setIsFollowing(true);
				toast.success(`Siguiendo a ${userData.username}`, toastConfig);

				const { data } = await userApi.post(isInGroupRoute, {
					user_id: userData.id,
					group_id: userGroup,
				});
				console.log(data);

				setIsInGroup(data.isInGroup);
			}
		} catch (error) {
			toast.error(`Error al seguir: ${error.message}`, toastConfig);
		}
	};

	const handleUnfollow = async () => {
		try {
			await userApi.post(unFollowRoute, {
				user_id: user.id,
				to_unfollow: userData.id,
			});
			setIsFollowing(false);
			// setIsInGroup(false);
			toast.success(`Dejaste de seguir a ${userData.username}`, toastConfig);
		} catch (error) {
			toast.error(`Error al dejar de seguir: ${error.message}`, toastConfig);
		}
	};

	const handleJoinGroup = async () => {
		try {
			await userApi.post(joinGroupRoute, {
				group_id: userGroup,
				user_id: user.id,
			});
			toast.success(`Te has unido al grupo`, toastConfig);
			setIsInGroup(true);
			closeModal();
			navigate("/");
		} catch (error) {
			toast.error(`Error al unirse al grupo: ${error.message}`, toastConfig);
			closeModal();
		}
	};

	const handleLeaveGroup = async () => {
		try {
			await userApi.post(leaveGroupRoute, {
				group_id: userGroup,
				user_id: user.id,
			});
			toast.success(`Te has salido del grupo`, toastConfig);
			setIsInGroup(false);
			closeModal();
		} catch (error) {
			toast.error(`Error al salirse del grupo: ${error.message}`, toastConfig);
			closeModal();
		}
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
		previewFiles(file, setImage);
	};

	useEffect(() => {
		if (editing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [editing]);

	useEffect(() => {
		if (userData) {
			setDescripcion(userData.description);
			setUserName(userData.username);
		}
	}, [userData]);

	async function handleSubmit() {
		const { data } = await userApi.patch(`${updateUserRoute}/${user.id}`, {
			username: userName,
			image,
			description,
		});

		if (data.status) {
			const user = {
				email: data.user.email,
				password: data.user.password,
				isEncrypted: true,
			};
			await login(user);
		}

		setEditing(false);
	}

	function handleStartEditing() {
		setEditing(true);
	}

	console.log("user data", userData);

	return (
		<>
			<main className="relative mx-auto w-full h-full bg-primario pb-20">
				<div className="absolute top-0 right-0 p-4">
					{editing ? (
						<IconCheck color="#ffffff" onClick={handleSubmit} />
					) : (
						<IconEdit color="#ffffff" onClick={handleStartEditing} />
					)}
				</div>
				<div className="flex justify-center pt-8">
					{!editing ? (
						<Img
							uploadedImg={userData.image}
							alt="foto perfil"
							className={"w-40 h-40 rounded-full"}
						/>
					) : image ? (
						<div className="centered">
							<img
								src={image}
								alt="Preview"
								className="h-36 w-36 rounded-full"
							/>
						</div>
					) : (
						<div className="relative flex justify-center">
							<Img
								isContact={true}
								className={`inline-block h-40 w-40 rounded-full filter brightness-50 contrast-150`}
								uploadedImg={userData.image}
								alt="avatar"
							/>
							<label
								htmlFor="signalImage"
								className="absolute inset-0 centered"
							>
								<IconFilePlus size={50} color="#fff" />
							</label>
							<input
								type="file"
								name="fileInput"
								id="signalImage"
								onChange={handleChange}
								accept="image/png, image/jpeg, image/jpg, image/svg, image/ico, image/jfif, image/webp"
								className="appearance-none hidden opacity-0"
							/>
						</div>
					)}
				</div>

				<div className="centered flex-col py-4 gap-3 ">
					<input
						ref={inputRef}
						type="text"
						className={`text-center bg-primario w-fit  text-white text-3xl font-bold focus:border-white ${
							editing ? "border-2 border-white " : "border-none"
						}`}
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						disabled={!editing}
					/>
				</div>
				<div className="">
					<h4 className="text-center text-tipografia text-sm mb-4">
						{userData.seguidores} seguidores
					</h4>
				</div>

				<div className="user-options centered flex-col gap-4">
					{isCurrentUser ? (
						<>
							<button className="btn-dark" onClick={showUserForm}>
								Editar Perfil
							</button>
							{!hasGroup ? (
								<button className="btn-dark" onClick={showGroupForm}>
									Crear Grupo
								</button>
							) : (
								<button className="btn-dark" onClick={showDeleteForm}>
									Borrar Grupo
								</button>
							)}
						</>
					) : (
						<>
							{!isFollowing ? (
								<button className="btn-dark" onClick={handleFollow}>
									Seguir
								</button>
							) : (
								<>
									<button className="btn-dark" onClick={handleUnfollow}>
										Dejar de Seguir
									</button>
									{hasGroup &&
										(!isInGroup ? (
											<button className="btn-dark" onClick={showJoinForm}>
												Unirse a grupo
											</button>
										) : (
											<button className="btn-dark" onClick={showLeaveForm}>
												Salir del grupo
											</button>
										))}
								</>
							)}
						</>
					)}
				</div>

				<div className="p-4">
					<RangeInput title={"Maximo Drawdown"} value={66.6} max={100} />
					<RangeInput title={"Riesgo/Beneficio medio"} value={3.5} max={4} />
					<RangeInput title={"% Mensual medio"} value={66.6} max={100} />
					<RangeInput title={"% Riesgo medio/trade"} value={311} max={311} />
				</div>

				{/* <ProgressBar titulo="Máximo Drawdown" porcentaje="66.6%" />
			<ProgressBar titulo="Riesgo/Beneficio medio" porcentaje="90.7%" />
			<ProgressBar titulo="% Mensual medio" porcentaje="77%" />
			<ProgressBar titulo="% Riesgo medio/trade" porcentaje="83.3%" /> */}

				<div className="mb-4">
					<textarea
						className={`w-full bg-primario text-white p-2 rounded-lg focus:border-white ${
							editing ? "border-2 border-white " : "border-none"
						}`}
						rows="4"
						value={description}
						onChange={(e) => setDescripcion(e.target.value)}
						disabled={!editing}
					/>
				</div>

				<div>
					<button className="text-white bg-secundario px-4 py-2 rounded-xl ml-2">
						Añadir trade
					</button>
				</div>
			</main>
			<ToastContainer />
		</>
	);
}
