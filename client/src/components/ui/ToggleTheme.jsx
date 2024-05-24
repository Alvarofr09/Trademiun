import useThemeToggle from "./useThemeToggle";

const ThemeToggleButton = () => {
	const [theme, toggleTheme] = useThemeToggle();

	return (
		<button
			onClick={toggleTheme}
			className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
		>
			{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
		</button>
	);
};

export default ThemeToggleButton;
