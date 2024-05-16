import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import Img from "../ui/CloudinaryImg";

export default function RestRankingTable({ users }) {
	return (
		<div className="overflow-x-auto ">
			<Table hoverable className=" mx-auto">
				<Table.Head className="text-center text-xl">
					<Table.HeadCell>Posición</Table.HeadCell>
					<Table.HeadCell>Usuario</Table.HeadCell>
					<Table.HeadCell>Rentabilidad</Table.HeadCell>
					<Table.HeadCell>Seguidores</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y text-center text-xl">
					{users.map((user) => (
						<Table.Row
							key={user.ranking}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{user.ranking}
							</Table.Cell>
							<Table.Cell>
								<Link
									to={`/user/${user.id}`}
									className="flex items-center justify-start pl-12"
								>
									<Img
										isContact={true}
										className="w-6 h-6 rounded-full  mr-4"
										uploadedImg={user.image}
										alt="user"
									/>
									{user.username}
								</Link>
							</Table.Cell>
							<Table.Cell>{user.rentabilidad}%</Table.Cell>
							<Table.Cell>{user.seguidores}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
