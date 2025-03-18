import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { FiPackage, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  onSwitchToProducts?: () => void;
  onSwitchToOrders?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSwitchToProducts, onSwitchToOrders }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleProductsClick = () => {
    if (onSwitchToProducts) {
      onSwitchToProducts();
    }
    setMobileMenuOpen(false);
  };

  const handleOrdersClick = () => {
    if (onSwitchToOrders) {
      onSwitchToOrders();
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Assuming /login is the route for logging in
    window.location.href = "/login"; // Use window.location.href for full page reload
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-purple-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="ml-2">
              <span className="text-white font-bold text-xl">S BEATS</span>
              <span className="block text-indigo-200 text-xs">Admin Dashboard</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              className="flex items-center px-4 py-2 text-sm text-white bg-indigo-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              onClick={handleProductsClick}
            >
              <FiPackage className="mr-2" />
              Products
            </button>
            
            <button
              className="flex items-center px-4 py-2 text-sm text-white bg-indigo-700 bg-opacity-50 hover:bg-opacity-80 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
              onClick={handleOrdersClick}
            >
              <FiShoppingBag className="mr-2" />
              Orders
            </button>
            
            <button
              className="flex items-center px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors ml-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="mr-2 text-lg" />
              Log Out
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-white hover:text-indigo-200 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 container mx-auto">
            <button
              className="w-full flex items-center px-3 py-2 text-sm text-white hover:bg-indigo-700 rounded transition-colors"
              onClick={handleProductsClick}
            >
              <FiPackage className="mr-2" />
              Products
            </button>
            
            <button
              className="w-full flex items-center px-3 py-2 text-sm text-white hover:bg-indigo-700 rounded transition-colors"
              onClick={handleOrdersClick}
            >
              <FiShoppingBag className="mr-2" />
              Orders
            </button>
            
            <button
              className="w-full flex items-center px-3 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="mr-2 text-lg" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;