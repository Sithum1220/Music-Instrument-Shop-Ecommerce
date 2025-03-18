import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assests/img/nk music logo.png";
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
      confirmButtonColor: '#6366F1',
      cancelButtonColor: '#F43F5E',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
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
        confirmButtonColor: '#6366F1'
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
          confirmButtonColor: '#6366F1'
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Check if cart is empty
  const isCartEmpty = cart.length === 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 hidden sm:inline-block">
                S BEATS
              </span>
            </Link>
            
            <div className="flex space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors px-3 py-2"
              >
                <FiHome className="mr-1" />
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
                className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md"
              >
                <FiChevronLeft className="mr-1" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Shopping Cart</h1>
          <p className="text-gray-600">
            {isCartEmpty 
              ? "Your cart is empty. Add some musical instruments to get started!" 
              : `You have ${cart.length} ${cart.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {isCartEmpty ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <FiShoppingCart className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link
              to="/product-list"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                </div>
                
                <ul className="divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <li key={item._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 ml-0 sm:ml-6 mt-4 sm:mt-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                            </div>
                            
                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className="text-lg font-medium text-indigo-600">
                                Rs. {item.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
                                onClick={() => handleQuantityChange(index, false)}
                                disabled={item.quantity <= 1}
                              >
                                <FiMinus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-1 text-gray-900">{item.quantity}</span>
                              <button
                                type="button"
                                className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
                                onClick={() => handleQuantityChange(index, true)}
                              >
                                <FiPlus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => removeFromCart(index)}
                              className="text-gray-400 hover:text-red-500 focus:outline-none transition-colors p-1"
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
                
                <div className="bg-gray-50 p-4 sm:p-6">
                  <div className="flex justify-between items-center text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs. {calculateSubtotal().toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary & Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="text-gray-900">Rs. {calculateSubtotal().toLocaleString()}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <p className="text-gray-600">Shipping</p>
                      <p className="text-gray-900">Free</p>
                    </div>
                    
                    <div className="flex justify-between font-medium text-base pt-3 border-t border-gray-200">
                      <p>Total</p>
                      <p className="text-indigo-600">Rs. {calculateTotalPrice().toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`block w-full rounded-md border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500`}
                        placeholder="Enter your name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`block w-full rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500`}
                        placeholder="you@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                        className={`block w-full rounded-md border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500`}
                        placeholder="Enter your delivery address"
                      />
                      {formErrors.address && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input
                        id="contactNumber"
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                        className={`block w-full rounded-md border ${formErrors.contactNumber ? 'border-red-500' : 'border-gray-300'} px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500`}
                        placeholder="Contact phone number"
                      />
                      {formErrors.contactNumber && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.contactNumber}</p>
                      )}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} NKBEATS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;