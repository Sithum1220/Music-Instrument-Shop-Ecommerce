import React from "react";
import HomeImage from "../../../assests/img/Home image.png";
import PrimaryButton from "../../Shared/PrimaryButton";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-20 min-h-[80vh]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="relative inline-block">
              <span className="absolute -top-8 -left-8 text-6xl text-indigo-200 opacity-50">"</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight relative z-10">
                Your Rhythmic Instrument Haven
              </h1>
              <div className="mt-4 mb-8 transform -rotate-1">
                <span className="text-4xl md:text-5xl lg:text-7xl font-cursive bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 relative">
                  S BEATS
                </span>
                <div className="h-3 w-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mt-1 opacity-70"></div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-lg mx-auto lg:mx-0">
              Unrivaled selection, expert guidance, and unbeatable prices—your
              top choice for musical instruments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <PrimaryButton>Shop Now</PrimaryButton>
              <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full font-medium hover:bg-indigo-50 transition-colors duration-300">
                Explore Categories
              </button>
            </div>
            
            <div className="flex justify-center lg:justify-start space-x-6 mt-8">
              <span className="flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                4.9/5 Rating
              </span>
              <span className="flex items-center text-sm text-gray-500">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Premium Quality
              </span>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full blur-3xl z"></div>
            <div className="relative z-10 bg-white/30 backdrop-blur-sm p-4 rounded-2xl shadow-2xl transform hover:-rotate-2 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-2xl"></div>
              <img 
                src={HomeImage} 
                alt="Musical instruments collection" 
                className="w-full h-auto rounded-xl object-cover relative z-[100]"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center">
                <span className="text-xl font-bold text-indigo-600 mr-2">15%</span>
                <span className="text-gray-600 text-sm">Discount for<br/>new customers</span>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 -left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow z-20">
              <span className="font-bold text-white">NEW</span>
            </div>
            <div className="absolute bottom-16 -right-6 bg-indigo-600 text-white rounded-full px-4 py-2 shadow-lg transform rotate-12 z-20">
              <span className="text-sm">Best Sellers</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Categories Preview */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
          <div className="h-1 w-24 bg-indigo-600 mx-auto mt-2"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
          {['Drums', 'Guitars', 'Keyboards', 'DJ Equipment'].map((category, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="h-40 bg-gray-200 flex items-center justify-center group-hover:bg-indigo-50 transition-colors duration-300">
                <span className="text-4xl text-gray-400 group-hover:text-indigo-500 transition-colors duration-300">🎵</span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{category}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Shop now</span>
                  <svg className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;