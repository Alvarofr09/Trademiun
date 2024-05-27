import { IconX } from "@tabler/icons-react";
import useThemeToggle from "../hooks/useThemeToggle";

export default function Modal({ title, closeModal, isImg, children }) {
	const [theme] = useThemeToggle();
	return (
		<div className="modal-container">
			<div className={`modal-content ${isImg ? "max-w-5xl" : "max-w-md"}`}>
				<div className="centered mb-6">
					<h2 className="text-3xl font-bold">{title}</h2>
				</div>
				<div className="close-btn  ">
					<IconX
						onClick={closeModal}
						color={theme === "light" ? "#000" : "#fff"}
					/>
				</div>

				{children}
			</div>
		</div>
	);
}
