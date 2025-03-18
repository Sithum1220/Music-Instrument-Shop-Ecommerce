import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiPackage, FiGrid, FiShoppingBag, FiUsers, FiSettings, FiLogOut, FiBarChart2 } from "react-icons/fi";
import logo from "../../../assests/img/nk music logo.png"; // Adjust path as needed

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    // logoutUser();
    navigate("/");
  };

  if (!showSidebar) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-900 to-purple-900 shadow-xl overflow-hidden transition-all duration-300 w-64">
      {/* Header & Logo */}
      <div className="p-5 border-b border-indigo-800">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="NKBEATS Logo" className="h-10 w-auto" />
          <span className="ml-2 text-xl font-bold text-white">NKBEATS</span>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-white font-bold">Admin Dashboard</h1>
          <div className="text-indigo-200 text-sm mt-1">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-4 py-6">
        <div className="space-y-1">
          <Link
            to="/admin"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiBarChart2 className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          
          <Link
            to="/admin/add-product"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin/add-product")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiPackage className="h-5 w-5 mr-3" />
            Add Product
          </Link>
          
          <Link
            to="/admin/load-product"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin/load-product")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiGrid className="h-5 w-5 mr-3" />
            Manage Products
          </Link>
          
          <Link
            to="/admin/orders"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin/orders")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiShoppingBag className="h-5 w-5 mr-3" />
            Orders
          </Link>
          
          <Link
            to="/admin/users"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin/users")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiUsers className="h-5 w-5 mr-3" />
            Users
          </Link>
          
          <Link
            to="/admin/settings"
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive("/admin/settings")
                ? "bg-indigo-700 text-white"
                : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
            }`}
          >
            <FiSettings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-3 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-indigo-800"
        >
          <FiLogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
        
        <div className="mt-4 text-center text-xs text-indigo-300">
          <p>NKBEATS Admin Panel</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;