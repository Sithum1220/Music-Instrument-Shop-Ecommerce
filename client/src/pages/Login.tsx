import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginImage from "../assests/img/Login Image.png";
import { loginUser } from "../api/authApi";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cart, signup } = location.state || {};

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = await loginUser(username, password);
      const role: string = userData.role; 

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "You have successfully logged in.",
        background: "#111827",
        color: "#fff",
        iconColor: "#D946EF"
      });
      
      console.log(signup);
      console.log(cart);
      console.log(formData);

      if (signup) {
        navigate('/payment', { state: { formData, cart } });
      } else if (cart) {
        navigate('/payment', { state: { formData, cart } });
      } else if (role === "customer") {
        navigate("/product-list");
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid username or password. Please try again."); 
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] text-gray-200 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDIyQzk0IiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Animated glow orbs */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#3B1D8F] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: i % 2 ? '#D946EF' : '#FB7185',
              opacity: 0.4,
              filter: 'blur(1px)',
              animation: `floatingLoginParticle ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      {/* Header with Logo */}
      <div className="p-6 relative z-10">
        <Link to="/" className="flex items-center group">
          {/* Logo symbol */}
          <div className="relative flex items-center justify-center w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
            <span className="relative text-white font-bold">EN</span>
          </div>

          <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
            ECHO NEXUS
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        <div className="max-w-6xl w-full bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-800">
          
          {/* Left Side - Login Form */}
          <div className="w-full md:w-1/2 px-6 sm:px-8 lg:px-12 py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 mb-8">Please sign in to continue your musical journey</p>
              
              {error && (
                <div className="mb-6 bg-red-900/20 border-l-4 border-[#FB7185] p-4 rounded backdrop-blur-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-[#FB7185]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-[#FB7185]">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] transition-colors duration-300 placeholder-gray-500"
                      placeholder="Enter your username"
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/20 to-[#FB7185]/0 transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <a href="#" className="text-sm text-[#D946EF] hover:text-[#FB7185] transition-colors duration-300">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-200 focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] transition-colors duration-300 placeholder-gray-500"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/20 to-[#FB7185]/0 transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-base font-medium text-white bg-gray-900 hover:bg-gray-800 transition-all duration-300 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    <span className="relative z-10">{isLoading ? "Signing in..." : "Sign in"}</span>
                  </button>
                </div>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{" "}
                  <button
                    onClick={handleSignupRedirect}
                    className="font-medium text-[#D946EF] hover:text-[#FB7185] transition-colors duration-300"
                  >
                    Create an account
                  </button>
                </p>
              </div>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="relative group py-2.5 px-4 rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D946EF] flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/10 to-[#FB7185]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <svg className="h-5 w-5 mr-2 relative z-10" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="relative z-10">Google</span>
                  </button>
                  <button
                    type="button"
                    className="relative group py-2.5 px-4 rounded-lg border border-gray-700 bg-gray-800 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D946EF] flex items-center justify-center transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/10 to-[#FB7185]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <svg className="h-5 w-5 mr-2 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V19c0 .27.16.59.67.5C17.14 18.16 20 14.42 20 10A10 10 0 0010 0z" />
                    </svg>
                    <span className="relative z-10">GitHub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden">
            <img 
              src={LoginImage} 
              alt="Login" 
              className="w-full h-full object-cover object-center rounded-r-2xl opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/90 to-[#3B1D8F]/60 flex items-center justify-center p-12">
              <div className="text-center text-white">
                <div className="inline-block p-4 rounded-full bg-[#D946EF]/20 backdrop-blur-sm mb-6 relative group">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D946EF]/30 to-[#FB7185]/30 blur-sm group-hover:blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Experience Your Rhythmic Journey</h3>
                <p className="text-gray-300 mb-6">Explore our premium collection of musical instruments and accessories</p>
                <div className="relative inline-block">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-70"></div>
                  <button className="relative px-6 py-2 bg-gray-900/80 text-white rounded-md backdrop-blur-sm">
                    Explore Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
     
    </div>
  );
};

export default Login;