import React, { useState, useEffect } from "react";
import Button from "../../Shared/Button";
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

  return (
    <div className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      scrolled ? "shadow-lg bg-white" : "bg-white/95 backdrop-blur-sm"
    }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">

            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 hidden sm:inline-block">
              S BEATS
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
                      className="text-gray-700 hover:text-indigo-600 font-medium text-sm uppercase tracking-wide relative py-2 px-1 transition-colors duration-300 group"
                    >
                      {name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="flex items-center space-x-3">
              {/* Shopping Cart Icon */}
              <button className="p-2 text-gray-700 hover:text-indigo-600 transition-colors duration-300 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
              
              {/* Login Button */}
              <Button>Login</Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setOpen(!open)} 
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="space-y-4 py-4">
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                <Link
                  to={link}
                  className="block text-gray-700 hover:text-indigo-600 py-2 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {name}
                </Link>
              </li>
            ))}
            <li className="pt-2 pb-4">
              <Button>Login</Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;