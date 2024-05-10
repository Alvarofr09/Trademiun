import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { userApi, getUserInfo } from "../api/APIRoutes";

export default function UserDetails() {
	const [user, setUser] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function fetchApi() {
			const { data } = await userApi.get(`${getUserInfo}/${id}`);
			console.log(data.user);
			setUser(data.user);
		}
		fetchApi();
	}, [id]);
	return (
		<main>
			<section className="user-details mb-10">
				<img src={user.image} alt="" className="user_image avatar-image" />
				<h2>{user.username}</h2>
			</section>

			<section className="user-info"></section>

			<section className="group">
				<Link to={`/create-group/${id}`} className="btn-primary">
					Crear un grupo
				</Link>
			</section>
		</main>
	);
}
