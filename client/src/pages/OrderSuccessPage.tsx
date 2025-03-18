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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 hidden sm:inline-block">
                S BEATS
              </span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              <IoLogOutOutline className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-8 px-6 text-white text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                <FiCheckCircle className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Successful!</h1>
              <p className="text-lg opacity-90">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>
            
            {/* Order Details */}
            <div className="px-6 py-8">
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium text-gray-900">{orderId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-medium text-gray-900">Credit Card</span>
                  </div>
                </div>
              </div>
              
              {/* Delivery Information */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <FiClock className="mt-1 mr-2 text-indigo-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Estimated Delivery</h3>
                        <p className="text-gray-600 mt-1">{deliveryDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <FiMail className="mt-1 mr-2 text-indigo-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                        <p className="text-gray-600 mt-1">Sent to your email</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* What's Next */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
                
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full text-indigo-600 text-sm mr-3 font-medium">1</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Order Confirmation</h3>
                      <p className="text-gray-600 mt-1">You will receive an email confirmation with your order details.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full text-indigo-600 text-sm mr-3 font-medium">2</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Order Processing</h3>
                      <p className="text-gray-600 mt-1">We will prepare your order for shipping. This usually takes 1-2 business days.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full text-indigo-600 text-sm mr-3 font-medium">3</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Shipping</h3>
                      <p className="text-gray-600 mt-1">Once your order is shipped, you will receive a tracking information email.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-indigo-100 rounded-full text-indigo-600 text-sm mr-3 font-medium">4</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Delivery</h3>
                      <p className="text-gray-600 mt-1">Your order will be delivered to your address. Estimated delivery date: {deliveryDate}.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Call to Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <FiHome className="mr-2" />
                  Back to Home
                </Link>
                
                <Link 
                  to="/product-list"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  <FiShoppingBag className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">S BEATS</span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} S BEATS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrderSuccess;