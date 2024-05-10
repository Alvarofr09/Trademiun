import { useField } from "formik";

export default function Checkbox({ ...props }) {
	const [field, meta] = useField(props);

	return (
		<div>
			<input
				{...props}
				{...field}
				className={meta.touched && meta.error ? "input-error" : ""}
			/>
			<span className="text-white"> Accept the terms and conditions</span>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</div>
	);
}
