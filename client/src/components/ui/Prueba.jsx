import { useField } from "formik";

export default function InputPrueba({ label, ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<label className="relative">
				<input
					{...props}
					{...field}
					className={meta.touched && meta.error ? "input-error" : "input"}
				/>
				<span
					className="text-3xl text-white text-opacity-80 absolute left-0 top-4
                mx-6 px-2 transition duration-200
                input-text"
				>
					{label}
				</span>
			</label>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
