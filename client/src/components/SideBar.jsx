import { Link, useLocation } from "react-router-dom";
import logo_negro from "../assets/img/logo_negro.png";
import logo_blanco from "../assets/img/logo_blanco.png";
import LogoChico from "../assets/img/LogoChico.png";
import LogoChico_blanco from "../assets/img/LogoChico_blanco.png";
import {
  IconMessage,
  IconMessageFilled,
  IconSearch,
  IconZoomFilled,
  IconNews,
  IconArticleFilled,
  // IconHexagonLetterB,
  // IconHexagonLetterBFilled,
  IconUser,
  IconUserFilled,
  IconPlayerPlay,
  IconPlayerPlayFilled,
  IconCreditCard,
  IconCreditCardFilled,
  IconLogout,
} from "@tabler/icons-react";
import { useUserContext } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";
import ThemeToggleButton from "./ui/ToggleTheme"; // Importa el botón de cambio de tema

export default function SideBar() {
  const { user } = useUserContext();
  const { logout } = useAuthContext();
  const location = useLocation();

  const routes = [
    {
      path: "/",
      label: "Chats",
      icon: IconMessage,
      iconFilled: IconMessageFilled,
    },
    {
      path: "/busqueda",
      label: "Búsqueda",
      icon: IconSearch,
      iconFilled: IconZoomFilled,
    },
    {
      path: "/noticias",
      label: "Noticias",
      icon: IconNews,
      iconFilled: IconArticleFilled,
    },
    // {
    // 	path: "/blog",
    // 	label: "Blog",
    // 	icon: IconHexagonLetterB,
    // 	iconFilled: IconHexagonLetterBFilled,
    // },
    {
      path: `/user/${user.id}`,
      label: "User",
      icon: IconUser,
      iconFilled: IconUserFilled,
    },
    {
      path: "/cursos",
      label: "Cursos",
      icon: IconPlayerPlay,
      iconFilled: IconPlayerPlayFilled,
    },
    {
      path: "/pagos",
      label: "Pagos",
      icon: IconCreditCard,
      iconFilled: IconCreditCardFilled,
    },
  ];

  return (
    <div className="max-w-68 h-lvh sticky md:text-base lg:text-lg text-2xl top-0 dark:bg-primario bg-white flex flex-col justify-between">
      {/* Sidebar */}
      <div>
        <div className="hidden lg:block py-8 w-36 xl:w-44 ml-12 mr-2">
          <img src={logo_negro} alt="logo" className="dark:hidden" />
          <img src={logo_blanco} alt="logo" className="hidden dark:block" />
        </div>
        <img
          className="ml-4 md:ml-6 lg:ml-12 py-8 block lg:hidden dark:hidden"
          src={LogoChico}
          alt="Logo"
        />
        <img
          className="ml-4 md:ml-6 lg:ml-12 py-8 lg:hidden hidden dark:block dark:lg:hidden"
          src={LogoChico_blanco}
          alt="Logo"
        />

        {routes.map(({ path, label, icon: Icon, iconFilled: IconFilled }) => (
          <Link
            key={path}
            to={path}
            className="flex hover:cursor-pointer mb-8 dark:text-white"
          >
            <div>
              {location.pathname === path ? (
                <IconFilled size={24} className="ml-4 md:ml-6 lg:ml-12 " />
              ) : (
                <Icon size={24} className="ml-4 md:ml-6 lg:ml-12 " />
              )}
            </div>
            <div>
              <p
                className={`md:hidden lg:block ml-4 ${
                  location.pathname === path && "font-bold"
                }`}
              >
                {label}
              </p>
            </div>
          </Link>
        ))}

        <div
          onClick={logout}
          className="flex hover:cursor-pointer mb-8 dark:text-white"
        >
          <div>
            <IconLogout size={24} className="ml-4 md:ml-6 lg:ml-12" />
          </div>
          <div>
            <p className="md:hidden lg:block ml-4">Logout</p>
          </div>
        </div>
      </div>

      {/* Botón de cambio de tema */}
      <div className="mb-8 ml-4 md:ml-6 lg:ml-12 flex flex-row">
        <ThemeToggleButton />
        <p className="md:hidden lg:block dark:lg:hidden">Dark Theme</p>
        <p className="md:hidden dark:lg:block text-white">Light Theme</p>
      </div>
    </div>
  );
}
