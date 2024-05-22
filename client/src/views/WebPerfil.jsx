import { useEffect, useState } from "react";
import { defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useUserContext } from "../context/UserContext";
import {
	followRoute,
	getUserInfo,
	getUserSignals,
	hasGroupRoute,
	isInGroupRoute,
	joinGroupRoute,
	leaveGroupRoute,
	isFollowingRoute,
	unFollowRoute,
	userApi,
	deleteGroupRoute,
} from "../api/APIRoutes";
import { useNavigate, useParams } from "react-router-dom";
import Signal from "../components/ui/Signal";
import Modal from "../components/Modal";
import GroupForm from "../components/GroupForm/GroupForm";
import UserForm from "../components/UserForm/UserForm";
import Img from "../components/ui/CloudinaryImg";
import { ToastContainer, toast } from "react-toastify";

const chartData = [
	{ label: "Enero", value: 65 },
	{ label: "Febrero", value: -59 },
	{ label: "Marzo", value: 80 },
	{ label: "Abril", value: -81 },
	{ label: "Mayo", value: 56 },
	{ label: "Junio", value: -55 },
	{ label: "Julio", value: -60 },
	{ label: "Agosto", value: 100 },
];

const chartConfig = {
	type: "bar",
	data: {
		labels: chartData.map((data) => data.label),
		datasets: [
			{
				label: "Ganancias",
				data: chartData.map((data) => data.value),
				backgroundColor: function (context) {
					const chart = context.chart;
					const { ctx, chartArea } = chart;

					if (!chartArea) {
						return null;
					}

					const gradient = ctx.createLinearGradient(
						0,
						chartArea.top,
						0,
						chartArea.bottom
					);

					if (context.raw >= 0) {
						gradient.addColorStop(0, "#30BC30");
						gradient.addColorStop(1, "#F0F0F0");
					} else {
						gradient.addColorStop(0, "#F0F0F0");
						gradient.addColorStop(1, "#CF2D2D");
					}

					return gradient;
				},
				borderWidth: 1,
			},
		],
	},
};

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const toastConfig = {
	position: "bottom-right",
	autoClose: 5000,
	pauseOnHover: true,
	draggable: true,
	theme: "dark",
};

export default function WebPerfil() {
	const { id } = useParams();
	const { user } = useUserContext();
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);
	const [signals, setSignals] = useState([]);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [showGroupModal, setShowGroupModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showUserModal, setShowUserModal] = useState(false);
	const [showJoinModal, setShowJoinModal] = useState(false);
	const [showLeaveModal, setShowLeaveModal] = useState(false);
	const [hasGroup, setHasGroup] = useState(false);
	const [userGroup, setUserGroup] = useState(null);
	const [isInGroup, setIsInGroup] = useState(false);

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

	return (
		<>
			<main className="h-screen centered border-l-2 border-primario lg:border-none bg-white flex-col lg:flex-row md:overflow-y-scroll lg:overscroll-hidden">
				{userData && (
					<section className="lg:basis-8/12 lg:border-x-2 gap-11 py-8 lg:border-primario h-screen user-info centered flex-col ">
						<div className="bordered basis-1/3 centered gap-16 py-5 px-8 lg:px-4 xl:px-12 w-[90%] mx-auto">
							<div className="user-image basis-1/3 ">
								<Img
									className="avatar-image"
									uploadedImg={userData.image}
									alt={`Avatar de ${userData.username}`}
								/>
							</div>
							<div className="user-details basis-1/3 ">
								<p className="text-sm lg:text-base ">
									<strong className="text-base lg:text-xl">Usuario: </strong>
									{userData.username}
								</p>

								<p className="text-sm lg:text-base ">
									<strong className="text-base lg:text-xl">Email: </strong>
									{userData.email}
								</p>

								<p className="text-sm lg:text-base ">
									<strong className="text-base lg:text-xl">Seguidores: </strong>
									{userData.seguidores}
								</p>
							</div>

							<div className="user-options basis-1/3 centered flex-col gap-4">
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
														<button
															className="btn-dark"
															onClick={showLeaveForm}
														>
															Salir del grupo
														</button>
													))}
											</>
										)}
									</>
								)}
							</div>
						</div>
						<div className="bordered basis-1/3 w-[90%] mx-auto">
							<div className="chart-container centered lg:h-72 h-96 w-full">
								<Bar data={chartConfig.data} className="h-full w-full" />
							</div>
						</div>
						<div className="bordered basis-1/3 centered gap-6 text-xl xl:text-2xl py-6 px-8 w-[90%] mx-auto">
							<ul className="w-1/2">
								<li>
									<strong>Señales: </strong>
									120
								</li>
								<li>
									<strong>Aciertos: </strong>
									80/120
								</li>
								<li>
									<strong>Ganancia promedio: </strong>
									45 pips
								</li>
								<li>
									<strong>Perdida promedio: </strong>6 pips
								</li>
							</ul>
							<ul className="w-1/2">
								<li>
									<strong>Duración promedio: </strong>4 horas
								</li>
								<li>
									<strong>Riesgo promedio: </strong>
									1.6 %
								</li>
								<li>
									<strong>Sesión promedio: </strong>
									Asia
								</li>
								<li>
									<strong>Total rentabilidad: </strong>
									54%
								</li>
							</ul>
						</div>
					</section>
				)}

				<article className="trades centered lg:overflow-y-scroll lg:scrollbar-custom flex-col basis-4/12 h-full">
					<div className="basis-1/12 centered h-full mt-10">
						<h2 className="titulo">Ultimos Trades</h2>
					</div>
					<div className="basis-11/12 w-full h-full">
						{signals.length === 0 ? (
							<h3 className="mt-10 text-xl centered">No hay trades</h3>
						) : (
							signals.map((signal) => {
								return <Signal key={signal.id} signal={signal} />;
							})
						)}
					</div>
				</article>

				{showGroupModal && (
					<Modal closeModal={closeModal} isImg={false} title="Crear Grupo">
						<GroupForm />
					</Modal>
				)}

				{showUserModal && (
					<Modal closeModal={closeModal} isImg={false} title="Editar Perfil">
						<UserForm closeModal={closeModal} />
					</Modal>
				)}

				{showJoinModal && (
					<Modal
						closeModal={closeModal}
						isImg={false}
						title={`Unirse a grupo de ${userData.username}?`}
					>
						<div className="gap-4 centered">
							<button
								onClick={() => handleJoinGroup()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-green-500 bg-green-600"
								type="submit"
							>
								Unirme
							</button>
							<button
								onClick={() => closeModal()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-red-500 bg-red-600"
								type="submit"
							>
								Cancelar
							</button>
						</div>
					</Modal>
				)}

				{showLeaveModal && (
					<Modal
						closeModal={closeModal}
						isImg={false}
						title={`Salirse del grupo de ${userData.username}?`}
					>
						<div className="gap-4 centered">
							<button
								onClick={() => handleLeaveGroup()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-green-500 bg-green-600"
								type="submit"
							>
								Salirme
							</button>
							<button
								onClick={() => closeModal()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-red-500 bg-red-600"
								type="submit"
							>
								Cancelar
							</button>
						</div>
					</Modal>
				)}

				{showDeleteModal && (
					<Modal
						closeModal={closeModal}
						isImg={false}
						title={`Estas seguro que quiere borrar el grupo?`}
					>
						<div className="gap-4 centered">
							<button
								onClick={() => handleDeleteGroup()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-green-500 bg-green-600"
								type="submit"
							>
								Confirmar
							</button>
							<button
								onClick={() => closeModal()}
								className="text-white px-8 py-4 border-none font-bold cursor-pointer rounded-[30px] text-xl uppercase transition duration-500 ease-in-out hover:bg-red-500 bg-red-600"
								type="submit"
							>
								Cancelar
							</button>
						</div>
					</Modal>
				)}
			</main>
			<ToastContainer />
		</>
	);
}
