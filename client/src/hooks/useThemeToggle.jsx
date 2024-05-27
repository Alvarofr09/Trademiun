import { useEffect, useState } from "react";

export default function useThemeToggle() {
	const [theme, setTheme] = useState(() => {
		// Inicializa el tema desde el localStorage o usa 'light' por defecto
		return localStorage.getItem("theme") || "light";
	});

	useEffect(() => {
		// Aplica el tema al cargar el componente
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Guarda el tema en el localStorage
		localStorage.setItem("theme", theme);
	}, [theme]); // Dependencia en 'theme' para ejecutar el efecto cuando cambia

	const toggleTheme = () => {
		// Alterna entre 'light' y 'dark'
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	return [theme, toggleTheme];
}
