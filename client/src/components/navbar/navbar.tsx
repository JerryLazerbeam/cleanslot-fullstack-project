import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  CalendarDays,
  TriangleAlert,
  BookOpen,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

type NavBarProps = {
  hideDesktopSidebar?: boolean;
};

export default function Navbar({ hideDesktopSidebar = false }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hämtar sparat tema när sidan laddas
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Aktiverar mörkt/ljust läge
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Byter mellan ljust och mörkt läge
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  // Bestämmer hur en navigeringslänk ska se ut
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `
      flex items-center gap-3
      px-4 py-3
      rounded-md
      transition-all duration-200

      ${
        isActive
          ? "bg-[#1F5C73] text-white"
          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1F5C73]"
      }
    `;

  return (
    <nav
      className={`
        bg-white dark:bg-[#111C22]
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300

        ${
          !hideDesktopSidebar
            ? "lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r lg:z-50"
            : ""
        }
      `}
    >
      {/* Header */}
      <div
        className="
          max-w-6xl
          mx-auto
          px-4
          py-4
          flex
          items-center
          justify-between

          lg:px-6
          lg:py-6
        "
      >
        <NavLink to="/booking">
          <img
            src="../images/logoclean.png"
            alt="CleanSlot Logo"
            className="h-10 w-auto block dark:hidden"
          />

          <img
            src="../images/CleanSlot-Logo-Darkmode.png"
            alt="CleanSlot Logo"
            className="h-10 w-auto hidden dark:block"
          />
        </NavLink>

        {/* Hamburger - endast mobil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            p-2
            rounded-md
            text-gray-700
            dark:text-gray-200
            hover:bg-gray-100
            dark:hover:bg-gray-800
            transition-colors
            lg:hidden
          "
          aria-label="Öppna meny"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil meny */}
      <div
        className={`
          overflow-hidden
          border-t border-gray-200 dark:border-gray-700
          bg-white dark:bg-[#111C22]
          lg:hidden
          transition-all
          duration-300
          ease-in-out

          ${
            menuOpen
              ? "max-h-[500px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
          {/* Min profil */}
          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <User size={20} />
            <span>Min profil</span>
          </NavLink>

          {/* Boka tvättid */}
          <NavLink
            to="/booking"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <CalendarDays size={20} />
            <span>Boka tvättid</span>
          </NavLink>

          {/* Felanmälan */}
          <NavLink
            to="/serviceReport"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <TriangleAlert size={20} />
            <span>Felanmälan</span>
          </NavLink>

          {/* Regler */}
          <NavLink
            to="/rules"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            <BookOpen size={20} />
            <span>Regler</span>
          </NavLink>

          {/* Mörkt läge */}
          <button
            onClick={toggleDarkMode}
            className="
              flex items-center justify-between
              px-4 py-3
              rounded-md
              text-gray-700 dark:text-gray-200
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-colors
            "
          >
            <div className="flex items-center gap-3">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span>{darkMode ? "Ljust läge" : "Mörkt läge"}</span>
            </div>

            {/* Toggle */}
            <div
              className={`
                relative
                w-11 h-6
                rounded-full
                transition-colors duration-300
                ${darkMode ? "bg-[#1F5C73]" : "bg-gray-300"}
              `}
            >
              <div
                className={`
                  absolute
                  top-1
                  w-4 h-4
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform duration-300
                  ${darkMode ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </div>
          </button>

          {/* Logga ut */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navLinkClass}
            >
              <LogOut size={20} />
              <span>Logga ut</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      {!hideDesktopSidebar && (
        <div className="hidden lg:flex lg:flex-col lg:px-6 lg:mt-8">
          <div className="flex flex-col gap-2">
            {/* Min profil */}
            <NavLink to="/profile" className={navLinkClass}>
              <User size={20} />
              <span>Min profil</span>
            </NavLink>

            {/* Boka tvättid */}
            <NavLink to="/booking" className={navLinkClass}>
              <CalendarDays size={20} />
              <span>Boka tvättid</span>
            </NavLink>

            {/* Felanmälan */}
            <NavLink to="/serviceReport" className={navLinkClass}>
              <TriangleAlert size={20} />
              <span>Felanmälan</span>
            </NavLink>

            {/* Regler */}
            <NavLink to="/rules" className={navLinkClass}>
              <BookOpen size={20} />
              <span>Regler</span>
            </NavLink>

            {/* Mörkt läge */}
            <button
              onClick={toggleDarkMode}
              className="
                flex items-center justify-between
                px-4 py-3
                rounded-md
                text-gray-700 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors
                mt-4
              "
            >
              <div className="flex items-center gap-3">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? "Ljust läge" : "Mörkt läge"}</span>
              </div>

              {/* Toggle */}
              <div
                className={`
                  relative
                  w-11 h-6
                  rounded-full
                  transition-colors duration-300
                  ${darkMode ? "bg-[#1F5C73]" : "bg-gray-300"}
                `}
              >
                <div
                  className={`
                    absolute
                    top-1
                    w-4 h-4
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-transform duration-300
                    ${darkMode ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </div>
            </button>

            {/* Logga ut */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
              <NavLink to="/" className={navLinkClass}>
                <LogOut size={20} />
                <span>Logga ut</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
