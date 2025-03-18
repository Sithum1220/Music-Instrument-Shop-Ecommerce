import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import logo from '../assests/img/nk music logo.png'; 
import { IonIcon } from '@ionic/react';
import { trash } from 'ionicons/icons';
import StripeCheckout, { Token } from 'react-stripe-checkout';
import { IoLogOutOutline } from 'react-icons/io5';

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

  const { formData, cart }: { formData: any; cart: CartItem[] } = location.state || { formData: null, cart: [] };

  const [cartItems] = useState<CartItem[]>(cart);
  const [formDataState, setFormDataState] = useState({
    name: formData?.name || '',
    address: formData?.address || '',
    contactNumber: formData?.contactNumber || '',
  });
  
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Navigate to login page
  };
  
  const handlePayment = async () => {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    try {
      const response = await fetch('http://localhost:4000/orders/placeOrder', {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`, // Include the token in the headers
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
      });

      
    } catch (error) {
      console.error('Error processing payment:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'There was an error processing your payment. Please try again.',
      });
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Order Summary */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-4 flex items-center">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Rs. {item.price}</p>
                      <p className="text-sm text-gray-600 mt-1">Total: Rs. {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>Rs. {calculateTotalPrice()}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Payment Details</h2>
              </div>
              
              <div className="p-6">
                <form>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={formDataState.name}
                        onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={formDataState.address}
                        onChange={(e) => setFormDataState({ ...formDataState, address: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <input
                        type="tel"
                        value={formDataState.contactNumber}
                        onChange={(e) => setFormDataState({ ...formDataState, contactNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                  <StripeCheckout
                stripeKey="pk_test_51Oqpc6DDs5wFiqTUqxEnnoVTjDMMCjMgbCnSwxKmVcHMCT8rLXO4wL7nTptnarrKOUMw4XRe1RNmvTBfWgC3t3mp00rTvqUUAW" // Replace with your Stripe publishable key
                token={handlePayment}
                name="NKBEATS"
                amount={calculateTotalPrice() * 100}
              />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">S BEATS</span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NKBEATS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentPage;