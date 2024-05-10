import { useField } from "formik";

export default function Select({ children, ...props }) {
	const [field, meta] = useField(props);

	return (
		<>
			{/* <label htmlFor="">{label}</label> */}
			<select
				{...props}
				{...field}
				className={meta.touched && meta.error ? "input-error" : "input"}
			>
				{children}
			</select>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
