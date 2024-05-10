import React from "react";

import { IconX } from "@tabler/icons-react";

export default function Modal({ closeModal, children }) {
	return (
		<div className="modal-container">
			<div className="modal-content">
				<div className="centered mb-6">
					<h2 className="text-3xl font-bold">Formulario de Señal</h2>
				</div>
				<div className="close-btn  ">
					<IconX onClick={closeModal} />
				</div>

				{children}
			</div>
		</div>
	);
}
