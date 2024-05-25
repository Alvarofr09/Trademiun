import useThemeToggle from "../../hooks/useThemeToggle";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";

const ThemeToggleButton = () => {
	const [theme, toggleTheme] = useThemeToggle();

	return (
		<button
			onClick={toggleTheme}
			className="text-black dark:text-white flex items-center"
		>
			{theme === "light" ? (
				<>
					<IconMoonFilled className="mr-2" />
				</>
			) : (
				<>
					<IconSunFilled className="mr-2" />
				</>
			)}
		</button>
	);
};

export default ThemeToggleButton;
