import React from "react";

import { IconX } from "@tabler/icons-react";

export default function Modal({ closeModal, isImg, children }) {
	return (
		<div className="modal-container">
			<div className={`modal-content ${isImg ? "max-w-5xl" : "max-w-md"}`}>
				<div className="centered mb-6">
					<h2 className="text-3xl font-bold">Formulario de Señal</h2>
				</div>
				<div className="close-btn  ">
					<IconX onClick={closeModal} color="#000" />
				</div>

				{children}
			</div>
		</div>
	);
}
