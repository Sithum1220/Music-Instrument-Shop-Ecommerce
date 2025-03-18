import React, { useState } from "react";
import SignUpImage from "../assests/img/SignUp Image.png";
import { signupUser } from "../api/authApi.js";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../assests/img/nk music logo.png';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve cart and formData from location state
  const { formData: cartPageFormData, cart: cartItems = [] } =
    location.state || { formData: {}, cart: [] };
    
  const [formState, setFormState] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'customer',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (field: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    
    // Clear error for the field being changed
    if (formErrors[field]) {
      setFormErrors(prev => {
        const updated = {...prev};
        delete updated[field];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.username.trim()) errors.username = "Username is required";
    
    if (!formState.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = "Email format is invalid";
    }
    
    if (!formState.password) {
      errors.password = "Password is required";
    } else if (formState.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // Merge cartPageFormData with current formState
      const mergedFormData = {
        ...formState,
        ...cartPageFormData,
      };

      const response = await signupUser(mergedFormData);

      await Swal.fire({
        icon: 'success',
        title: 'Signup Successful!',
        text: 'You have successfully signed up.',
      });
      
      navigate('/login', { state: { formData: cartPageFormData, cart: cartItems, signup: true } });
    } catch (error: any) {
      console.error('Signup error:', error);
      let errorMessage = 'Signup failed. Please try again.';

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setError(errorMessage);

      await Swal.fire({
        icon: 'error',
        title: 'Signup Failed!',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header with Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center">
          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            S BEATS
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 px-6 sm:px-8 lg:px-12 py-10">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600 mb-8">Join our community of music enthusiasts</p>
              
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formState.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.username ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                    placeholder="Choose a username"
                  />
                  {formErrors.username && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                    placeholder="you@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formState.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300`}
                    placeholder="Create a password"
                  />
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    id="role"
                    value={formState.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden">
            <img 
              src={SignUpImage} 
              alt="Sign Up" 
              className="w-full h-full object-cover object-center rounded-r-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 flex items-center justify-center p-12">
              <div className="text-center text-white">
                <div className="inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Join Our Music Community</h3>
                <p className="text-white/80 mb-6">Create an account to access exclusive deals and personalized recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;