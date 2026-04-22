import { useState } from "react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Beranda", path: "/" },
  { name: "Tentang", path: "/tentang" },
  { name: "Kategori", path: "/kategori" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-15 z-20 bg-[#e9cfeb] shadow-md font-serif">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 px-2 sm:px-4 lg:px-20">
          <div className="shrink-0 flex items-center space-x-1 sm:space-x-2">
            <div className="h-12 w-8 sm:h-20 sm:w-10 items-center justify-center flex">
              <img src="/digifest-logo1.svg" alt="DIGIFEST Logo" />
            </div>
            <NavLink
              to="/"
              className="bg-[#e21c70] bg-clip-text text-transparent text-lg sm:text-2xl lg:text-4xl font-bold transition-all duration-300 font-serif"
            >
              DIGIFEST
            </NavLink>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="text-[#191b37] hover:text-pink-600 px-3 py-2 rounded-md text-md font-bold transition-colors duration-300 font-serif"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu button */}

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-pink-600 focus:outline-none focus:text-pink-600 p-2"
            >
              <svg
                className="h-6 w-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zM4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zM4 19a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        {isOpen && (
          <div className="fixed md:hidden left-0 right-0 w-full h-60 bg-[#e9cfeb] z-10 border-b border-pink-300">
            <ul className="flex flex-col items-center justify-center h-full space-y-5">
              {menuItems.map((item) => (
                <li key={item.name} className="border-b border-pink-300 w-full text-center pb-5 last:border-b-0">
                  <NavLink
                    to={item.path}
                    className="text-[#191b37] hover:text-pink-600 px-6 py-4 rounded-md text-2xl font-bold transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
