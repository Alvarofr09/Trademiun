import { useField } from "formik";

export default function Image({ ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<div className="grid w-full max-w-xs items-center gap-1.5">
				<input
					{...props}
					{...field}
					id="picture"
					type="file"
					className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
				/>
			</div>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
