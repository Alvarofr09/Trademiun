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
					<p className="md:hidden lg:block">Dark Theme</p>
				</>
			) : (
				<>
					<IconSunFilled className="mr-2" />
					<p className="md:hidden lg:block">Light Theme</p>
				</>
			)}
		</button>
	);
};

export default ThemeToggleButton;
