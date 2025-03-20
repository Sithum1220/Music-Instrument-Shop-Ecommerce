import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiClock, FiMail, FiHome } from 'react-icons/fi';
import { IoLogOutOutline } from 'react-icons/io5';

interface OrderSuccessProps {}

const OrderSuccess: React.FC<OrderSuccessProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order details from location state
  const { orderId = 'NK' + Math.floor(100000 + Math.random() * 900000) } = location.state || {};
  
  // Estimate delivery date (5 days from now)
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-200 flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzgxMTdFIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#D946EF] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-md border-b border-gray-800 shadow-lg z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185] hidden sm:inline-block">
                ECHO NEXUS
              </span>
            </Link>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <button
                onClick={handleLogout}
                className="relative bg-gray-900 text-white px-4 py-2 rounded-md font-medium z-10 flex items-center"
              >
                <IoLogOutOutline className="mr-2" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-800">
            {/* Success Header */}
            <div className="relative bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] py-10 px-6 text-white text-center overflow-hidden">
              {/* Animated success particles */}
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute rounded-full bg-white opacity-30"
                  style={{
                    top: '50%',
                    left: '50%',
                    width: `${Math.random() * 8 + 2}px`,
                    height: `${Math.random() * 8 + 2}px`,
                    transform: 'translate(-50%, -50%)',
                    animation: `successParticle ${Math.random() * 2 + 1}s infinite ease-out`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900/30 backdrop-blur-sm rounded-full mb-6 border border-white/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#3B1D8F]/50 to-[#FB7185]/50 animate-spin-slow rounded-full opacity-50"></div>
                  <FiCheckCircle className="w-10 h-10 text-white relative z-10" />
                </div>
                <h1 className="text-3xl font-bold mb-2 drop-shadow-glow">Order Successful!</h1>
                <p className="text-lg opacity-90 max-w-lg mx-auto">
                  Thank you for your purchase. Your order has been successfully placed.
                </p>
              </div>
            </div>
            
            {/* Order Details */}
            <div className="px-6 py-8">
              <div className="border-b border-gray-800 pb-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 relative inline-block">
                  Order Details
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Number:</span>
                    <span className="font-medium text-white">{orderId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Order Date:</span>
                    <span className="font-medium text-white">{new Date().toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="font-medium text-white">Credit Card</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery Information */}
              <div className="border-b border-gray-800 pb-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4 relative inline-block">
                  Delivery Information
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-300">
                    <div className="flex items-start">
                      <div className="p-2 rounded-md bg-gray-900/60 text-[#D946EF] mr-3">
                        <FiClock className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Estimated Delivery</h3>
                        <p className="text-gray-400 mt-1">{deliveryDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-300">
                    <div className="flex items-start">
                      <div className="p-2 rounded-md bg-gray-900/60 text-[#FB7185] mr-3">
                        <FiMail className="text-xl" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Order Confirmation</h3>
                        <p className="text-gray-400 mt-1">Sent to your email</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* What's Next */}
              <div>
                <h2 className="text-xl font-bold text-white mb-4 relative inline-block">
                  What's Next?
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h2>
                
                <ul className="space-y-6 mt-6">
                  {[
                    {
                      title: "Order Confirmation",
                      description: "You will receive an email confirmation with your order details."
                    },
                    {
                      title: "Order Processing",
                      description: "We will prepare your order for shipping. This usually takes 1-2 business days."
                    },
                    {
                      title: "Shipping",
                      description: "Once your order is shipped, you will receive a tracking information email."
                    },
                    {
                      title: "Delivery",
                      description: `Your order will be delivered to your address. Estimated delivery date: ${deliveryDate}.`
                    }
                  ].map((step, index) => (
                    <li key={index} className="flex items-start group">
                      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#D946EF]/20 to-[#FB7185]/20 rounded-full text-white text-sm mr-4 font-medium border border-gray-700 group-hover:border-[#D946EF] transition-colors duration-300">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">{step.title}</h3>
                        <p className="text-gray-400 mt-1">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-300 border border-gray-700 group"
                >
                  <FiHome className="mr-2 group-hover:text-[#D946EF] transition-colors duration-300" />
                  <span>Back to Home</span>
                </Link>
                
                <div className="relative flex-1 group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <Link 
                    to="/product-list"
                    className="relative flex w-full items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md z-10"
                  >
                    <FiShoppingBag className="mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative flex items-center justify-center w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                ECHO NEXUS
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ECHO NEXUS. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/product-list" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Products
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Support
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderSuccess;