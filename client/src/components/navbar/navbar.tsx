import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavBarProps = {
  hideDesktopSidebar?: boolean;
};

export default function Navbar({ hideDesktopSidebar = false }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`
        bg-white
        border-b border-gray-200
    
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
        <img
          src="../images/logoclean.png"
          alt="CleanSlot Logo"
          className='h-10 w-auto'
        />

        {/* Hamburger - endast mobil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            p-2
            rounded-md
            hover:bg-gray-100

            lg:hidden
          "
          aria-label="Öppna meny"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobil meny */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
            <a href="/profile" className="text-gray-700 hover:text-gray-400">
              Min profil
            </a>

            <a href="/booking" className="text-gray-700 hover:text-gray-400">
              Boka tvättid
            </a>

            <a
              href="/my-bookings"
              className="text-gray-700 hover:text-gray-400"
            >
              Mina bokningar
            </a>

            <a href="/complaints" className="text-gray-700 hover:text-gray-400">
              Felanmälan
            </a>

            <a href="/rules" className="text-gray-700 hover:text-gray-400">
              Regler
            </a>

            <a href="/" className="text-gray-700 hover:text-gray-400">
              Logga ut
            </a>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {!hideDesktopSidebar && (
        <div className="hidden lg:flex lg:flex-col lg:px-6 lg:mt-8">
          <div className="flex flex-col gap-2">
            <a
              href="/profile"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Min profil
            </a>

            <a
              href="/booking"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Boka tvättid
            </a>

            <a
              href="/my-bookings"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Mina bokningar
            </a>

            <a
              href="/complaints"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Felanmälan
            </a>

            <a
              href="/rules"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Regler
            </a>
            <a
              href="/"
              className="px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Logga ut
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
