import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Fill te pone la imagen entera en el tamaño de la caja
// Thumbnail redimensiona la imagen
// import { fill, thumbnail } from "@cloudinary/url-gen/actions/resize";

// import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
// FocusOn hace focus en un punto de la imagen: el centro, la cara etc
// import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";

export default function Img({ uploadedImg, className }) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dzfjiypm9",
		},
	});

	const myImage = cld.image(uploadedImg);

	return (
		<>
			<AdvancedImage
				className={className}
				cldImg={myImage}
				plugins={[lazyload(), placeholder({ mode: "blur" })]}
			/>
		</>
	);
}
