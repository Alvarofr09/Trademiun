import { useField } from "formik";
import { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

export default function Input({ type, ...props }) {
	const [field, meta] = useField(props);
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};

	return (
		<>
			<div className="input-container relative">
				<input
					{...props}
					{...field}
					type={showPassword ? "text" : type} // Cambia dinámicamente el tipo de entrada
					className={meta.touched && meta.error ? "input-error" : "input"}
				/>
				{type === "password" && (
					<button
						type="button"
						className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent focus:outline-none"
						onClick={toggleShowPassword}
					>
						{showPassword ? <IconEyeClosed /> : <IconEye />}
					</button>
				)}
			</div>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
