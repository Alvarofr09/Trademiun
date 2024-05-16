import axios from "axios";

export const host = "http://localhost:3000";

export const registerRoute = `/api/auth/register`;
export const loginRoute = `/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsersRoute = `${host}/api/auth/allUsers`;
export const getUserInfo = `${host}/api/auth/getUserInfo`;
export const getTopRentabilidad = `${host}/api/auth/get-users-by-rentabilidad`;
export const getTopSeguidores = `${host}/api/auth/get-users-by-seguidores`;
export const updateUserRoute = `${host}/api/auth/update-user`;

export const sendMessageRoute = `${host}/api/messages/add-message`;
export const getAllGroupMessages = `${host}/api/messages/getGroupMessages`;

export const createGroupRoute = `${host}/api/groups/create-group`;
export const joinGroupRoute = `${host}/api/groups/join-group`;
export const getAllGroups = `${host}/api/groups/get-groups`;
export const isAdmin = `${host}/api/groups/is-admin`;

export const sendSignalRoute = `${host}/api/signals/add-signal`;
export const getSignalsGroup = `${host}/api/signals/get-signals`;
export const getUserSignals = `${host}/api/signals/get-user-signals`;

export const userApi = axios.create({
	baseURL: `${host}`,
});
