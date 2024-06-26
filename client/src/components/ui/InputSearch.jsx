import { useEffect, useState } from "react";

const InputSearch = ({ handleSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			handleSearch(searchTerm);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};
	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className="lg:w-[80%] mx-auto p-4 "
		>
			<label
				htmlFor="default-search"
				className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
			>
				Search
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
					<svg
						className="w-4 h-4 text-primario dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
						/>
					</svg>
				</div>
				<input
					type="search"
					id="default-search"
					className="block w-full p-4 ps-10 text-sm text-primario dark:text-white border border-gray-300 rounded-2xl bg-gray-50 focus:ring-secundario focus:border-secundario dark:bg-primario dark:border-white dark:placeholder-white "
					placeholder="Buscar..."
					required
					value={searchTerm}
					onChange={handleChange}
				/>
				{/* <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-secundario hover:bg-secundario focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Buscar
        </button> */}
			</div>
		</form>
	);
};

export default InputSearch;
