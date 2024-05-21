import { useState, useEffect } from "react";

function useDeviceType() {
	// Estado para almacenar si el dispositivo es móvil o no
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		// Función para manejar el cambio de tamaño de la ventana
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		// Agregar un event listener para el cambio de tamaño de la ventana
		window.addEventListener("resize", handleResize);

		// Limpiar el event listener cuando el componente se desmonte
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return isMobile;
}

export default useDeviceType;
