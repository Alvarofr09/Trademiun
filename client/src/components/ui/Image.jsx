import { useField } from "formik";
import ImageAdd from "../../assets/File_Image.svg";
import { IconFilePlus } from "@tabler/icons-react";

export default function Image({ ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<div className="">
				<label htmlFor="picture">
					<IconFilePlus size={50} />
				</label>
				<input
					{...props}
					{...field}
					id="picture"
					type="file"
					className="appearance-none hidden opacity-0"
				/>
			</div>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
