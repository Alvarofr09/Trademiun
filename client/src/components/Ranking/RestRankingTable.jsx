import { Table } from "flowbite-react";

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
							<Table.Cell className="flex items-center justify-start pl-12">
								<img
									className="w-6 h-6 rounded-full  mr-4"
									src={user.image}
									alt="user"
								/>
								{user.username}
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
