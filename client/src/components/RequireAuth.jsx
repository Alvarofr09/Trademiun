import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function RequireAuth() {
	const { auth } = useAuthContext();
	return auth ? <Outlet /> : <Navigate to="/forms" />;
}
