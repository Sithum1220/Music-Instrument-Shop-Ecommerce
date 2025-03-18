import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assests/img/nk music logo.png';
import { FiAward, FiUsers, FiMusic, FiHeart, FiStar, FiTruck, FiHeadphones, FiSmile } from 'react-icons/fi';

// You can replace these with your actual team images
const teamMember1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";
const teamMember2 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";
const teamMember3 = "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&h=200&q=80";

// You can replace this with an actual store image
const storeImage = "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const AboutUs: React.FC = () => {
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
            
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/product-list"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Products
              </Link>
              <Link
                to="/contact-us"
                className="text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute transform -rotate-12 translate-x-1/4 -translate-y-1/4">
            <FiMusic className="w-96 h-96" />
          </div>
          <div className="absolute bottom-0 right-0 transform rotate-12 translate-x-1/4 translate-y-1/4">
            <FiHeadphones className="w-96 h-96" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About US</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Your rhythmic instrument haven, providing quality musical instruments and expert guidance since 2015.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src={storeImage} 
                alt="S BEATS Store" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                S BEATS was founded in 2015 with a simple vision: to provide high-quality musical instruments to enthusiasts, professionals, and beginners alike. What started as a small shop in Colombo has now grown into a trusted name in the music industry.
                </p>
                <p>
                  Our founder, Nishantha Karunaratne, a passionate musician himself, believed that everyone deserves access to quality instruments at fair prices. This principle continues to guide our business today.
                </p>
                <p>
                  Over the years, we've expanded our collection to include a wide range of instruments from renowned brands worldwide, while maintaining our commitment to quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">
                <FiAward className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">
                We meticulously select each instrument for its craftsmanship and sound quality, ensuring you get nothing but the best.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">
                <FiUsers className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in building a community of musicians who inspire each other and share their passion for music.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">
                <FiHeart className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Passion</h3>
              <p className="text-gray-600">
                Our team consists of musicians who are passionate about helping you find the perfect instrument for your musical journey.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-indigo-600 mb-4">
                <FiSmile className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're committed to providing exceptional service before and after your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose S BEATS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 text-indigo-600">
                <FiStar className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our team of experienced musicians provides personalized advice to help you make informed decisions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 text-indigo-600">
                <FiTruck className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  We ensure prompt delivery of your instruments, carefully packaged to reach you in perfect condition.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3 text-indigo-600">
                <FiHeadphones className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">After-Sales Support</h3>
                <p className="text-gray-600">
                  Our relationship doesn't end with your purchase. We're here to support you throughout your musical journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={teamMember1} 
                  alt="Team Member" 
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Nishantha Karunaratne</h3>
              <p className="text-indigo-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Musician and entrepreneur with over 20 years of experience in the music industry.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={teamMember2} 
                  alt="Team Member" 
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Kasun Perera</h3>
              <p className="text-indigo-600 mb-2">Music Specialist</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Professional guitarist with extensive knowledge of string instruments and amplification.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={teamMember3} 
                  alt="Team Member" 
                  className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Samanthi Fernando</h3>
              <p className="text-indigo-600 mb-2">Customer Experience</p>
              <p className="text-gray-600 max-w-xs mx-auto">
                Dedicated to ensuring every customer has an exceptional experience with S BEATS.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Musical Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Explore our collection of premium instruments and find the perfect one for you.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/product-list"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact-us"
              className="px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-gray-700 font-medium">S BEATS</span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} S BEATS. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/" className="text-gray-500 hover:text-indigo-600">Home</Link>
              <Link to="/product-list" className="text-gray-500 hover:text-indigo-600">Products</Link>
              <Link to="/contact-us" className="text-gray-500 hover:text-indigo-600">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;