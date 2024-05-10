import { useField } from "formik";

export default function TextArea({ props }) {
	const [field, meta] = useField(props);
	return (
		<div className="input-container">
			<textarea
				{...props}
				{...field}
				className={meta.touched && meta.error ? "input-error" : "input"}
				cols="4"
				rows="40"
			>
				Hola
			</textarea>
		</div>
	);
}
