import "../../App.css";

export default function RangeInput({ title, value, max }) {
	return (
		<>
			<span className="text-fondoWebApp opacity-50 ">{title}</span>
			<div className="relative w-full my-2">
				<input
					type="range"
					min="0"
					max={max}
					value={value}
					disabled
					className="thumb range-input appearance-none w-full h-4 rounded-full bg-[#808080] bg-opacity-50 outline-none pointer-events-none"
				/>
				<div
					className="absolute top-[1px] left-0 h-4 rounded-full bg-secundario pointer-events-none"
					style={{ width: `${(value / max) * 100}%` }}
				></div>
				<div
					className="absolute top-[1px] left-0 h-4 flex items-center justify-end pr-2 pointer-events-none "
					style={{ width: `${(value / max) * 100}%` }}
				>
					<span className="text-[10px] text-white  rounded">{value}%</span>
				</div>
			</div>
		</>
	);
}
