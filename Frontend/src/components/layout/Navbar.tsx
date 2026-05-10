import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const menuItems = [
  { name: "Beranda", path: "#Beranda" },
  { name: "Tentang", path: "#Tentang" },
  {
    name: "Event",
    path: "/Event",
    dropdown: [
      { name: "Genetic", path: "/Event/GNT" },
      { name: "Creative Dance Competition", path: "/Event/CDC" },
      { name: "IT Competition", path: "/Event/IC" },
    ],
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setMobileDropdownOpen(null);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const targetId = path.substring(1);

      if (location.pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 64;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        navigate("/" + path);
      }
      setIsOpen(false);
      setActiveDropdown(null);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 w-full h-16 z-50 transition-all duration-300 font-montserrat ${
        isScrolled
          ? "bg-[#e9cfeb]/70 backdrop-blur-md shadow-md"
          : "bg-[#e9cfeb] bg-[radial-gradient(#e21c7022_1px,transparent_1px)] bg-size-[20px_20px]"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 px-2 sm:px-4 lg:px-20">
          <div className="shrink-0 flex items-center space-x-1 sm:space-x-2">
            <div className="h-10 w-10 sm:h-12 sm:w-12 items-center justify-center flex">
              <NavLink to="/" onClick={(e) => handleNavClick(e, "#Beranda")}>
                <img src="/digifest-logo1.svg" alt="DIGIFEST Logo" className="h-full w-full object-contain" />
              </NavLink>
            </div>
            <NavLink
              to="/"
              className="bg-[#191b37] bg-clip-text text-transparent text-sm sm:text-md font-bold transition-all duration-300 font-montserrat"
            >
              DIGIFEST
            </NavLink>
          </div>

          <div className="hidden md:block">
            <ul ref={dropdownRef} className="flex space-x-8">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex items-center">
                    <NavLink
                      to={item.path}
                      onClick={(e) => {
                        if (item.dropdown) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === item.name ? null : item.name);
                        } else {
                          handleNavClick(e, item.path);
                        }
                      }}
                      className="text-[#191b37] hover:text-pink-600 px-3 py-2 rounded-md text-md font-bold transition-colors duration-300 font-montserrat flex items-center gap-1 cursor-pointer"
                    >
                      {item.name}
                      {item.dropdown && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </NavLink>
                  </div>

                  {item.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#191b37]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50"
                        >
                          {item.dropdown.map((dropItem) => (
                            <NavLink
                              key={dropItem.name}
                              to={dropItem.path}
                              className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 text-sm font-semibold text-center"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {dropItem.name}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.li>
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed md:hidden left-0 right-0 w-full bg-[#e9cfeb]/95 backdrop-blur-lg z-10 border-b border-pink-300 overflow-hidden"
            >
              <ul className="flex flex-col items-center justify-center py-4">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className="border-b border-pink-300/30 w-full text-center last:border-b-0"
                  >
                    {item.dropdown ? (
                      <div className="flex flex-col w-full">
                        <button
                          onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.name ? null : item.name)}
                          className="text-[#191b37] hover:text-pink-600 w-full px-6 py-4 text-sm font-bold transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                          {item.name}
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              mobileDropdownOpen === item.name ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {mobileDropdownOpen === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="w-full"
                            >
                              {item.dropdown.map((dropItem) => (
                                <NavLink
                                  key={dropItem.name}
                                  to={dropItem.path}
                                  className="block px-6 py-3 text-[#191b37] hover:text-pink-600 text-xs font-semibold"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setMobileDropdownOpen(null);
                                  }}
                                >
                                  {dropItem.name}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <NavLink
                        to={item.path}
                        className="text-[#191b37] hover:text-pink-600 block px-6 py-4 text-sm font-bold transition-colors duration-300"
                        onClick={(e) => handleNavClick(e, item.path)}
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}