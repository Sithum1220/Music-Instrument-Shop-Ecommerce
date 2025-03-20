import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import { IoLogOutOutline } from 'react-icons/io5';
import { FiCreditCard, FiCheckCircle, FiShield } from 'react-icons/fi';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { formData, cart }: { formData: any; cart: CartItem[] } = location.state || { formData: null, cart: [] };

  const [cartItems] = useState<CartItem[]>(cart);
  const [formDataState, setFormDataState] = useState({
    name: formData?.name || '',
    address: formData?.address || '',
    contactNumber: formData?.contactNumber || '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      // If payment method created successfully, place the order
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:4000/orders/placeOrder', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formDataState.name,
          address: formDataState.address,
          contactNumber: formDataState.contactNumber,
          cartItems: cartItems.map(item => ({
            _id: item._id,
            quantity: item.quantity,
          })),
          totalAmount: calculateTotalPrice(),
          paymentMethodId: paymentMethod.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const responseData = await response.json();
      await Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        text: `Your payment has been processed successfully. Order ID: ${responseData.orderId}`,
        background: '#1E1E2E',
        color: '#E2E8F0',
        iconColor: '#D946EF',
        confirmButtonColor: '#D946EF'
      });

      // Navigate to order confirmation or clear cart
      navigate('/order-success', { state: { orderId: responseData.orderId } });
      
    } catch (error) {
      console.error('Error processing payment:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'There was an error processing your payment. Please try again.',
        background: '#1E1E2E',
        color: '#E2E8F0',
        iconColor: '#FB7185',
        confirmButtonColor: '#D946EF'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#E2E8F0',
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#64748B',
        },
        ':-webkit-autofill': {
          color: '#E2E8F0',
        },
      },
      invalid: {
        color: '#FB7185',
        iconColor: '#FB7185',
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#111827] text-gray-200">
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
      <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-8 relative inline-block">
            <span className="relative z-10">Complete Your Purchase</span>
            <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Order Summary */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Order Summary</h2>
              </div>
              
              <div className="divide-y divide-gray-800">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-4 flex items-center group hover:bg-gray-800/30 transition-colors duration-300">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-700 bg-gray-800">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">{item.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">USD. {item.price}</p>
                      <p className="text-sm text-gray-400 mt-1">Total: <span className="text-white">{item.price * item.quantity}</span></p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-gray-800/50">
                <div className="flex justify-between text-base font-medium">
                  <p className="text-white">Total</p>
                  <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                    USD. {calculateTotalPrice()}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-400">Shipping and taxes will be calculated at checkout.</p>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <h2 className="text-lg font-medium text-white">Payment Details</h2>
              </div>
              
              <div className="p-6">
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                      <input
                        type="text"
                        value={formDataState.name}
                        onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                      <textarea
                        value={formDataState.address}
                        onChange={(e) => setFormDataState({ ...formDataState, address: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number</label>
                      <input
                        type="tel"
                        value={formDataState.contactNumber}
                        onChange={(e) => setFormDataState({ ...formDataState, contactNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Card Details</label>
                      <div className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus-within:ring-[#D946EF] focus-within:border-[#D946EF]">
                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-2 text-gray-400 text-xs">
                      <FiShield className="w-4 h-4 text-[#D946EF]" />
                      <span>Your payment information is encrypted and secure</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <FiCheckCircle className="w-5 h-5 text-[#D946EF]" />
                      <span>All transactions are secure and encrypted</span>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                      <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="relative w-full px-4 py-3 bg-gray-900 text-white font-medium rounded-md z-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <FiCreditCard className="mr-2" />
                            Pay Now • USD. {calculateTotalPrice()}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Payment Security Notes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                icon: <FiShield className="w-6 h-6 text-[#D946EF]" />, 
                title: "Secure Payment", 
                text: "Your payment information is encrypted with industry-standard protocols" 
              },
              { 
                icon: <FiCreditCard className="w-6 h-6 text-[#FB7185]" />, 
                title: "Multiple Payment Options", 
                text: "We accept all major credit cards and debit cards" 
              },
              { 
                icon: <FiCheckCircle className="w-6 h-6 text-[#3B1D8F]" />, 
                title: "Verified Processing", 
                text: "All transactions are processed by verified payment providers" 
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900/40 backdrop-blur-sm p-4 rounded-lg border border-gray-800 flex items-start space-x-3">
                <div className="mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-white font-medium">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 mt-12">
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

export default PaymentPage;