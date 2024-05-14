import { Table } from "flowbite-react";

export default function RestRankingTable({ users }) {
	console.log(users);
	return (
		<div className="overflow-x-auto ">
			<Table hoverable className="mx-auto" style={{ width: "60%" }}>
				<Table.Head>
					<Table.HeadCell>Posición</Table.HeadCell>
					<Table.HeadCell>Usuario</Table.HeadCell>
					<Table.HeadCell>Rentabilidad</Table.HeadCell>
					<Table.HeadCell>Seguidores</Table.HeadCell>
					<Table.HeadCell>
						{/* <span className="sr-only">Edit</span> */}
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y text-center">
					{users.map((user) => (
						<Table.Row
							key={user.ranking}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className=" whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{user.ranking}
							</Table.Cell>
							<Table.Cell className="flex items-center justify-start">
								<img
									className="w-6 h-6 rounded-full"
									src={user.image}
									alt="user"
								/>
								{user.username}
							</Table.Cell>
							<Table.Cell>{user.rentabilidad}%</Table.Cell>
							<Table.Cell>{user.seguidores}</Table.Cell>
							<Table.Cell>
								{/* <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a> */}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
}
