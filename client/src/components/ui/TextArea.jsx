import { useField } from "formik";

export default function TextArea({ props }) {
	const [field, meta] = useField(props);
	return (
		<div className="input-container w-full">
			<textarea
				{...props}
				{...field}
				className={
					meta.touched && meta.error
						? "input-error"
						: "w-full px-6 text-xl text-primario bg-fondoWebApp bg-opacity-80 border-2 rounded-[30px] border-none border-opacity-50 outline-none focus:border-purple-400  transition duration-200"
				}
				// className={`w-full bg-white dark:bg-primario text-primario dark:text-white p-2 rounded-lg focus:border-primario dark:focus:border-white` }
				rows="4"
			/>
		</div>
	);
}
