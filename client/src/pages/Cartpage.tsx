import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiChevronLeft, FiHome, FiCreditCard } from "react-icons/fi";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems: { [key: string]: CartItem } =
    location.state?.cartItems || {};
  const [cart, setCart] = useState<CartItem[]>(Object.values(cartItems));
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    email: "", 
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (index: number, increment: boolean) => {
    const updatedCart = [...cart];
    if (increment) {
      updatedCart[index].quantity++;
    } else {
      updatedCart[index].quantity > 1 && updatedCart[index].quantity--;
    }
    setCart(updatedCart);
  };

  const removeFromCart = (index: number) => {
    Swal.fire({
      title: 'Remove Item?',
      text: 'Are you sure you want to remove this item from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D946EF',
      cancelButtonColor: '#FB7185',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
      background: '#1E1E2E',
      color: '#E2E8F0',
      iconColor: '#FB7185'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
      }
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) errors.name = "Name is required";
    
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      errors.address = "Please enter a complete address";
    }
    
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      errors.contactNumber = "Please enter a valid contact number";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (cart.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Cart',
        text: 'Your cart is empty. Please add items before checking out.',
        confirmButtonColor: '#D946EF',
        background: '#1E1E2E',
        color: '#E2E8F0',
        iconColor: '#FB7185'
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        navigate("/payment", { state: { formData, cart } });
        return;
      }
      
      const { email } = formData;
      
      const response = await axios.get(
        `http://localhost:4000/auth/search/${email}`
      );
      const { exists } = response.data;
      
      if (exists) {
        navigate("/login", { state: { formData, cart } });
      } else {
        navigate("/signup", { state: { formData, cart } });
      }
    } catch (error: any) {
      console.error("Error checking email:", error);
      if (error.response && error.response.status === 404) {
        navigate("/signup", { state: { formData, cart } });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#D946EF',
          background: '#1E1E2E',
          color: '#E2E8F0',
          iconColor: '#FB7185'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Check if cart is empty
  const isCartEmpty = cart.length === 0;

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
            
            <div className="flex space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-300 hover:text-white transition-colors px-3 py-2 group"
              >
                <FiHome className="mr-1 group-hover:text-[#D946EF] transition-colors" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/product-list"
                state={{
                  cartItems: cart.reduce(
                    (acc, item) => ({ ...acc, [item._id]: item }),
                    {}
                  ),
                }}
                className="flex items-center text-gray-300 hover:text-white transition-colors bg-gray-800/50 hover:bg-gray-700/50 px-3 py-2 rounded-md border border-gray-700 group"
              >
                <FiChevronLeft className="mr-1 group-hover:text-[#D946EF] transition-colors" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow relative">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative inline-block">
            <span className="relative z-10">Your Shopping Cart</span>
            <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
          </h1>
          <p className="text-gray-400">
            {isCartEmpty 
              ? "Your cart is empty. Add some musical instruments to get started!" 
              : `You have ${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {isCartEmpty ? (
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center border border-gray-800 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-800/50 rounded-full mb-6 relative">
              <div className="absolute inset-0 rounded-full border-2 border-[#D946EF]/20 animate-pulse"></div>
              <FiShoppingCart className="w-10 h-10 text-[#D946EF]" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <div className="relative inline-block group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <Link
                to="/product-list"
                className="relative inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md font-medium z-10"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-800">
                <div className="p-4 sm:p-6 border-b border-gray-800">
                  <h2 className="text-lg font-semibold text-white">Cart Items</h2>
                </div>
                
                <ul className="divide-y divide-gray-800">
                  {cart.map((item, index) => (
                    <li key={item._id} className="p-4 sm:p-6 hover:bg-gray-800/30 transition-colors group">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-800 rounded-md overflow-hidden">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-base font-medium text-white group-hover:text-[#FB7185] transition-colors">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-400">{item.category}</p>
                            </div>
                            
                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                                USD. {item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border border-gray-700 rounded-md bg-gray-800/50 overflow-hidden">
                              <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
                                onClick={() => handleQuantityChange(index, false)}
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className={`w-4 h-4 ${item.quantity <= 1 ? 'opacity-50' : 'hover:text-[#D946EF]'}`} />
                              </button>
                              <span className="px-4 py-1 text-white">{item.quantity}</span>
                              <button
                                type="button"
                                className="p-2 text-gray-400 hover:text-white focus:outline-none transition-colors"
                                onClick={() => handleQuantityChange(index, true)}
                              >
                                <FiPlus className="w-4 h-4 hover:text-[#D946EF]" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeFromCart(index)}
                              className="text-gray-400 hover:text-[#FB7185] focus:outline-none transition-colors p-1 group"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-gray-800/50 p-4 sm:p-6">
                  <div className="flex justify-between items-center text-base font-medium">
                    <p className="text-white">Subtotal</p>
                    <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                      USD. {calculateSubtotal().toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary & Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg divide-y divide-gray-800 border border-gray-800">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 relative inline-block">
                    Order Summary
                    <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                  </h2>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between">
                      <p className="text-gray-400">Subtotal</p>
                      <p className="text-white">{calculateSubtotal().toLocaleString()}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-gray-400">Shipping</p>
                      <p className="text-white">Free</p>
                    </div>
                    
                    <div className="flex justify-between font-medium text-base pt-3 border-t border-gray-700">
                      <p className="text-white">Total</p>
                      <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                        USD. {calculateTotalPrice().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4 relative inline-block">
                    Shipping Information
                    <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`block w-full rounded-md bg-gray-800 border ${formErrors.name ? 'border-[#FB7185]' : 'border-gray-700'} px-4 py-3 text-white placeholder-gray-500 focus:border-[#D946EF] focus:ring-[#D946EF]`}
                        placeholder="Enter your name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-[#FB7185]">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`block w-full rounded-md bg-gray-800 border ${formErrors.email ? 'border-[#FB7185]' : 'border-gray-700'} px-4 py-3 text-white placeholder-gray-500 focus:border-[#D946EF] focus:ring-[#D946EF]`}
                        placeholder="you@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-[#FB7185]">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-1">Shipping Address</label>
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className={`block w-full rounded-md bg-gray-800 border ${formErrors.address ? 'border-[#FB7185]' : 'border-gray-700'} px-4 py-3 text-white placeholder-gray-500 focus:border-[#D946EF] focus:ring-[#D946EF]`}
                        placeholder="Enter your delivery address"
                      />
                      {formErrors.address && (
                        <p className="mt-1 text-sm text-[#FB7185]">{formErrors.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300 mb-1">Contact Number</label>
                      <input
                        id="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className={`block w-full rounded-md bg-gray-800 border ${formErrors.contactNumber ? 'border-[#FB7185]' : 'border-gray-700'} px-4 py-3 text-white placeholder-gray-500 focus:border-[#D946EF] focus:ring-[#D946EF]`}
                        placeholder="Contact phone number"
                      />
                      {formErrors.contactNumber && (
                        <p className="mt-1 text-sm text-[#FB7185]">{formErrors.contactNumber}</p>
                      )}
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="relative w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md font-medium z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <FiCreditCard className="mr-2" />
                            Proceed to Checkout
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
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
              <Link to="/cart" state={{ cartItems: cart.reduce(
                (acc, item) => ({ ...acc, [item._id]: item }),
                {}
              ) }} className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Cart
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;