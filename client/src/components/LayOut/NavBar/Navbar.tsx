import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface NavLink {
  id: number;
  name: string;
  link: string;
}

const NavLinks: NavLink[] = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "AboutUs", link: "/about" },
  { id: 3, name: "Products", link: "/login" },
  { id: 4, name: "ContactUs", link: "/ContactUs" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLoginBtn = () => {
    navigate("/login");
  };
  return (
    <div
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-lg shadow-lg shadow-[#D946EF]/5"
          : "bg-transparent"
      }`}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] opacity-80"></div>

      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Logo symbol */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
              <span className="relative text-white font-bold">EN</span>
            </div>

            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185] hidden sm:inline-block">
              ECHO NEXUS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <nav className="mr-6">
              <ul className="flex space-x-8">
                {NavLinks.map(({ id, name, link }) => (
                  <li key={id}>
                    <Link
                      to={link}
                      className="text-gray-300 hover:text-white font-medium text-sm uppercase tracking-wide relative py-2 px-1 transition-colors duration-300 group"
                    >
                      <span className="relative z-10">{name}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] transition-all duration-300 group-hover:w-full"></span>
                      {/* Glow effect on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-[#D946EF]/0 to-[#FB7185]/0 group-hover:from-[#D946EF]/5 group-hover:to-[#FB7185]/5 rounded-md blur-sm transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center space-x-3">
              {/* Shopping Cart Icon */}
              <button className="p-2 text-gray-300 hover:text-white transition-colors duration-300 relative group">
                <div className="absolute inset-0 rounded-full bg-gray-800/0 group-hover:bg-gray-800/50 transition-colors duration-300"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-20 shadow-lg shadow-[#D946EF]/30">
                  0
                </span>
              </button>

              {/* Login Button with custom gradient style */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-90 transition duration-500"></div>
                <button
                  onClick={handleLoginBtn}
                  className="relative px-5 py-2 bg-gray-900 text-white rounded-md font-medium text-sm"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none relative group"
            >
              <div className="absolute inset-0 rounded-full bg-gray-800/0 group-hover:bg-gray-800/50 transition-colors duration-300"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-gray-900/90 backdrop-blur-md shadow-lg shadow-[#D946EF]/5 border-t border-gray-800 transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="space-y-4 py-4">
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  className="block text-gray-300 hover:text-white py-3 px-4 font-medium rounded-md hover:bg-gray-800/50 transition-colors duration-300 relative"
                  onClick={() => setOpen(false)}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D946EF] to-[#FB7185] rounded-l-md opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                  <span className="relative pl-1">{name}</span>
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-4 px-4">
              <div className="relative w-full">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-70"></div>
                <button className="relative w-full px-5 py-2.5 bg-gray-900 text-white rounded-md font-medium">
                  Login
                </button>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Animated particles for non-scrolled state */}
      {!scrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: i % 2 ? "#D946EF" : "#FB7185",
                filter: "blur(1px)",
                animation: `floatingNavParticle ${
                  Math.random() * 10 + 5
                }s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
