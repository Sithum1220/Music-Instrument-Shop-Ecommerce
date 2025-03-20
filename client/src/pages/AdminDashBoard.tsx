import React, { useState } from "react";
import Navbar from "../components/Shared/AdminNavBar";
import AddProductPopup from "../pages/AdminProductAddPage";
import ProductTable from "../pages/AdminProductLoadPage";
import OrderLoadPage from "../pages/OrdersLoadPage"; 

const AdminDashBordPage: React.FC = () => {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 42,
    totalOrders: 18,
    pendingOrders: 5,
    revenue: 12580
  });

  const handleOpenPopup = () => {
    setShowAddProductPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddProductPopup(false);
  };

  const handleSwitchToProducts = () => {
    setShowProducts(true);
  };

  const handleSwitchToOrders = () => {
    setShowProducts(false);
  };

  const handleAdd = () => {
    // Implement logic to update product list here
    window.location.reload();
    console.log("Product list updated!"); // Placeholder example
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyQzk0IiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Animated glow orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3B1D8F] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#D946EF] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-2/3 w-64 h-64 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <Navbar onSwitchToProducts={handleSwitchToProducts} onSwitchToOrders={handleSwitchToOrders} />
      
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Products Card */}
          <div className="bg-gray-900/70 backdrop-blur-sm overflow-hidden rounded-lg border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-[#D946EF]/20 hover:border-gray-700 group">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-[#3B1D8F] to-[#D946EF] rounded-md p-3 group-hover:shadow-md group-hover:shadow-[#D946EF]/40 transition-all duration-300">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Total Products</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white group-hover:text-[#D946EF] transition-colors duration-300">{dashboardStats.totalProducts}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 px-4 py-4 sm:px-6 border-t border-gray-800">
              <div className="text-sm">
                <button 
                  onClick={handleSwitchToProducts}
                  className="font-medium text-[#D946EF] hover:text-[#FB7185] transition-colors duration-300 flex items-center"
                >
                  <span>View all products</span>
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Orders Card */}
          <div className="bg-gray-900/70 backdrop-blur-sm overflow-hidden rounded-lg border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-[#D946EF]/20 hover:border-gray-700 group">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-[#D946EF] to-[#FB7185] rounded-md p-3 group-hover:shadow-md group-hover:shadow-[#FB7185]/40 transition-all duration-300">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white group-hover:text-[#FB7185] transition-colors duration-300">{dashboardStats.totalOrders}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 px-4 py-4 sm:px-6 border-t border-gray-800">
              <div className="text-sm">
                <button 
                  onClick={handleSwitchToOrders}
                  className="font-medium text-[#FB7185] hover:text-[#D946EF] transition-colors duration-300 flex items-center"
                >
                  <span>View all orders</span>
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Pending Orders Card */}
          <div className="bg-gray-900/70 backdrop-blur-sm overflow-hidden rounded-lg border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-[#D946EF]/20 hover:border-gray-700 group">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-[#FB7185] to-yellow-400 rounded-md p-3 group-hover:shadow-md group-hover:shadow-yellow-400/40 transition-all duration-300">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Pending Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300">{dashboardStats.pendingOrders}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 px-4 py-4 sm:px-6 border-t border-gray-800">
              <div className="text-sm">
                <button 
                  onClick={handleSwitchToOrders}
                  className="font-medium text-yellow-400 hover:text-[#FB7185] transition-colors duration-300 flex items-center"
                >
                  <span>Process pending orders</span>
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-gray-900/70 backdrop-blur-sm overflow-hidden rounded-lg border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-[#D946EF]/20 hover:border-gray-700 group">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-gradient-to-br from-emerald-400 to-[#3B1D8F] rounded-md p-3 group-hover:shadow-md group-hover:shadow-emerald-400/40 transition-all duration-300">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-400 truncate">Total Revenue</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">${dashboardStats.revenue.toLocaleString()}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/60 px-4 py-4 sm:px-6 border-t border-gray-800">
              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-400 hover:text-[#D946EF] transition-colors duration-300 flex items-center">
                  <span>View financial reports</span>
                  <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Action Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="bg-gray-900/70  shadow-lg rounded-lg overflow-hidden border border-gray-800">
          <div className="px-4 py-5 border-b border-gray-800 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-white flex items-center">
              {showProducts ? (
                <>
                  <svg className="w-5 h-5 mr-2 text-[#D946EF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Product Management
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2 text-[#FB7185]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Order Management
                </>
              )}
            </h3>
            {showProducts && (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-md blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <button 
                  className="relative inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md font-medium transition-colors duration-300 z-10"
                  onClick={handleOpenPopup}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5 text-[#D946EF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </button>
              </div>
            )}
          </div>
          
          <div className="overflow-x-auto">
            {showProducts ? <ProductTable /> : <OrderLoadPage />}
          </div>
        </div>
      </div>

      {/* Add Product Popup */}
      {showAddProductPopup && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-80 backdrop-blur-sm"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-gray-800 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3B1D8F]/10 via-[#D946EF]/5 to-[#FB7185]/10 pointer-events-none"></div>
              <AddProductPopup onClose={handleClosePopup} onAdd={handleAdd} />
            </div>
          </div>
        </div>
      )}
      
      
    </div>
  );
};

export default AdminDashBordPage;