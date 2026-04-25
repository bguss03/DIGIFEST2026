import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const menuItems = [
  { name: "Beranda", path: "#Beranda" },
  { name: "Tentang", path: "#Tentang" },
  { name: "Kategori", path: "#Kategori" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith("#")) {
      e.preventDefault();
      const targetId = path.substring(1);
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
      setIsOpen(false);
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
            <div className="h-12 w-8 sm:h-20 sm:w-10 items-center justify-center flex">
              <NavLink to="/" onClick={(e) => handleNavClick(e, "#Beranda")}>
                <img src="/digifest-logo1.svg" alt="DIGIFEST Logo" />
              </NavLink>
            </div>
            <NavLink
              className="bg-[#191b37] bg-clip-text text-transparent text-md sm:text-md lg:text-md font-bold transition-all duration-300 font-montserrat"
            >
              DIGIFEST
            </NavLink>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className="text-[#191b37] hover:text-pink-600 px-3 py-2 rounded-md text-md font-bold transition-colors duration-300 font-montserrat"
                  >
                    {item.name}
                  </NavLink>
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
              animate={{ opacity: 1, height: 240 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed md:hidden left-0 right-0 w-full bg-[#e9cfeb]/95 backdrop-blur-lg z-10 border-b border-pink-300 overflow-hidden"
            >
              <ul className="flex flex-col items-center justify-center h-full space-y-5">
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className="border-b border-pink-300 w-full text-center pb-5 last:border-b-0"
                  >
                    <NavLink
                      to={item.path}
                      className="text-[#191b37] hover:text-pink-600 px-6 py-4 rounded-md text-2xl font-bold transition-colors duration-300"
                      onClick={(e) => handleNavClick(e, item.path)}
                    >
                      {item.name}
                    </NavLink>
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
