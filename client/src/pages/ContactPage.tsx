import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
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
            
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                Products
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
              >
                About Us
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] text-white overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated particles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                animation: `float ${Math.random() * 10 + 15}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-glow">Contact Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-gray-800 rounded-xl border border-gray-700 group-hover:border-[#D946EF] p-4 text-[#D946EF] transition-colors duration-300">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">Our Location</h3>
                    <p className="text-gray-400 mt-1">
                      123 Music Avenue, Colombo 5<br />
                      Sri Lanka
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-gray-800 rounded-xl border border-gray-700 group-hover:border-[#FB7185] p-4 text-[#FB7185] transition-colors duration-300">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">Phone Number</h3>
                    <p className="text-gray-400 mt-1">
                      +94 11 234 5678<br />
                      +94 77 123 4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-gray-800 rounded-xl border border-gray-700 group-hover:border-[#D946EF] p-4 text-[#D946EF] transition-colors duration-300">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">Email</h3>
                    <p className="text-gray-400 mt-1">
                      info@echonexus.com<br />
                      support@echonexus.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="flex-shrink-0 bg-gray-800 rounded-xl border border-gray-700 group-hover:border-[#FB7185] p-4 text-[#FB7185] transition-colors duration-300">
                    <FiClock className="w-6 h-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white group-hover:text-[#FB7185] transition-colors duration-300">Opening Hours</h3>
                    <p className="text-gray-400 mt-1">
                      Monday to Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 5:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-lg font-medium text-white mb-4 relative inline-block">
                  Follow Us
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h3>
                <div className="flex space-x-4 mt-6">
                  <a href="#" className="bg-gray-800 p-3 rounded-xl text-[#D946EF] hover:bg-gray-700 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-[#D946EF] group">
                    <FiFacebook className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-xl text-[#FB7185] hover:bg-gray-700 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-[#FB7185] group">
                    <FiInstagram className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                  <a href="#" className="bg-gray-800 p-3 rounded-xl text-[#D946EF] hover:bg-gray-700 hover:text-white transition-colors duration-300 border border-gray-700 hover:border-[#D946EF] group">
                    <FiTwitter className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg p-8 border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-8 relative inline-block">
                  Send Us a Message
                  <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
                </h2>
                
                {submitSuccess && (
                  <div className="mb-6 bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-[#22c55e]">Your message has been sent successfully. We'll get back to you soon!</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-6 bg-[#ef4444]/10 border-l-4 border-[#ef4444] p-4 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-[#ef4444]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-[#ef4444]">There was an error sending your message. Please try again.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="Customer Support">Customer Support</option>
                      <option value="Product Inquiry">Product Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Returns & Refunds">Returns & Refunds</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
                      placeholder="Write your message here..."
                    />
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full flex items-center justify-center py-3 px-4 bg-gray-900 rounded-lg text-white font-medium z-10 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-900/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 text-center relative inline-block mx-auto">
            <span className="relative z-10">Visit Our Store</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
          </h2>
          
          <div className="bg-gray-800/60 rounded-xl overflow-hidden shadow-lg h-96 border border-gray-700">
            {/* Replace this with an actual map component like Google Maps */}
            <div className="w-full h-full flex items-center justify-center bg-gray-800/30 backdrop-blur-sm">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full opacity-20 blur-xl animate-pulse"></div>
                  <FiMapPin className="relative z-10 mx-auto h-16 w-16 text-[#D946EF] mb-4" />
                </div>
                <p className="text-gray-300">Interactive map will be displayed here</p>
                <p className="text-sm text-gray-400 mt-2">123 Music Avenue, Colombo 5, Sri Lanka</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-900/10 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-10 text-center relative inline-block mx-auto">
            <span className="relative z-10">Frequently Asked Questions</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: "Do you offer international shipping?",
                  answer: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary depending on the destination. Please contact us for specific information about shipping to your country."
                },
                {
                  question: "What is your return policy?",
                  answer: "We accept returns within 14 days of delivery. Items must be in their original condition and packaging. Please note that shipping costs for returns are the responsibility of the customer unless the return is due to our error."
                },
                {
                  question: "Do you offer instrument repairs?",
                  answer: "Yes, we provide repair services for most musical instruments. Our experienced technicians can handle everything from minor adjustments to major repairs. Please contact us for a quote."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors duration-300 group">
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#FB7185] transition-colors duration-300">{faq.question}</h3>
                  <p className="text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
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
              <Link to="/about-us" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                About
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;