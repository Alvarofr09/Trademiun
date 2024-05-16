import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useState } from "react";
import Modal from "../Modal";

// Fill te pone la imagen entera en el tamaño de la caja
// Thumbnail redimensiona la imagen
// import { fill, thumbnail } from "@cloudinary/url-gen/actions/resize";

// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// FocusOn hace focus en un punto de la imagen: el centro, la cara etc
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export default function Img({ uploadedImg, className }) {
	const [showModal, setShowModal] = useState(false);
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dzfjiypm9",
		},
	});

	const showImage = () => {
		setShowModal(true); // Mostrar el modal al activar la función
	};

	const closeModal = () => {
		setShowModal(false); // Cerrar el modal
	};

	const myImage = cld.image(uploadedImg);

	return (
		<>
			<AdvancedImage
				onClick={showImage}
				className={className}
				cldImg={myImage}
				plugins={[lazyload(), placeholder({ mode: "blur" })]}
			/>

			{showModal && (
				<Modal closeModal={closeModal} isImg={true}>
					<AdvancedImage
						className=" max-w[700px] lg:max-h-[500px] max-h-[700px] w-full h-full"
						cldImg={myImage}
						plugins={[lazyload(), placeholder({ mode: "blur" })]}
					/>
				</Modal>
			)}
		</>
	);
}
