import axios from "axios";

export const host = "http://localhost:3000";

export const registerRoute = `/api/auth/register`;
export const loginRoute = `/api/auth/login`;
export const followRoute = `/api/auth/follow`;
export const isFollowingRoute = `/api/auth/is-following`;
export const unFollowRoute = `/api/auth/unfollow`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const getAllUsersRoute = `${host}/api/auth/allUsers`;
export const getUserInfo = `${host}/api/auth/getUserInfo`;
export const getTopRentabilidad = `${host}/api/auth/get-users-by-rentabilidad`;
export const getTopSeguidores = `${host}/api/auth/get-users-by-seguidores`;
export const getUsersByNameRoute = `/api/auth/get-users-by-name`;
export const updateUserRoute = `${host}/api/auth/update-user`;
export const hasGroupRoute = `${host}/api/auth/has-group`;

export const sendMessageRoute = `${host}/api/messages/add-message`;
export const getAllGroupMessages = `${host}/api/messages/getGroupMessages`;

export const createGroupRoute = `${host}/api/groups/create-group`;
export const deleteGroupRoute = `/api/groups/delete-group`;
export const joinGroupRoute = `${host}/api/groups/join-group`;
export const leaveGroupRoute = `${host}/api/groups/leave-group`;
export const getAllGroupsOfUser = `${host}/api/groups/get-groups-user`;
export const getAllGroupsOfUserByName = `${host}/api/groups/get-groups-user-by-name`;
export const getAllGroups = `${host}/api/groups/get-all-groups`;
export const getGroupsByName = `${host}/api/groups/get-all-groups-by-name`;
export const getGroupsInfo = `${host}/api/groups/get-group-info`;
export const isInGroupRoute = `${host}/api/groups/is-in-group`;
export const isAdmin = `${host}/api/groups/is-admin`;

export const sendSignalRoute = `${host}/api/signals/add-signal`;
export const getSignalsGroup = `${host}/api/signals/get-signals`;
export const getUserSignals = `${host}/api/signals/get-user-signals`;
export const getSignalsWithUser = `/api/signals/get-signals-with-user`;

export const userApi = axios.create({
	baseURL: `${host}`,
});
