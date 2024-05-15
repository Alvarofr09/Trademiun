import { useField } from "formik";
import ImageAdd from "../../assets/File_Image.svg";
import { IconFilePlus } from "@tabler/icons-react";

export default function Image({ ...props }) {
	const [field, meta] = useField(props);
	return (
		<>
			<div className="">
				<label htmlFor="signalImage">
					<IconFilePlus size={50} />
				</label>
				<input
					{...props}
					{...field}
					onChange={(e) => alert(e.target.files[0])}
					id="signalImage"
					type="file"
					className="appearance-none hidden opacity-0"
				/>
			</div>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</>
	);
}
